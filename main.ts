// @deno-types="npm:@types/express@4"
import express from "npm:express"
import {Server} from "npm:socket.io"
import * as http from "node:http";

import cors from "npm:cors"
import process from "node:process";
import { findOpponent } from "./matchmaking.ts"
import { nodejsQuizQuestions } from "./questions.ts";

const app = express()
app.use(cors())
const webSocketServer = http.createServer(app)
const SOCKET_IO = new Server(webSocketServer, {
    cors: {
        origin: Deno.env.get("FRONTEND_URL"),
        allowedHeaders: "*",
        methods: ["*"]
    }
})

export type MatchmakingData =  {
    userName: string;
    category: string;
}

export interface Players {
    socketId: string
    category: string
}

export class MatchmakingQueue {
    items: Array<Players> = [];
    constructor(){
        this.items = []
    }
}

const GlobalMatchMakingQueue = new MatchmakingQueue()

const activeSocketConnections = new Set<string>()
SOCKET_IO.on("connection", (socket) => {
    //Handle Incoming connection from individual client
    activeSocketConnections.add(socket.id)

    socket.emit("Thanks for connection")
    socket.on("find-opponent", (data: MatchmakingData) => {
        const opponentSocketId = findOpponent(data, GlobalMatchMakingQueue)
        if(!opponentSocketId){
            GlobalMatchMakingQueue.items.push({
                socketId: socket.id,
                category: data.category
            })
        }
        else {
            console.log("Found Opponent")
            const matchData = {
                player1: socket.id,
                player2: opponentSocketId,
                questions: nodejsQuizQuestions
            };
            socket.emit("start-match", matchData);
            
        }
    })

    socket.on("disconnect", () => {
        console.info(`Client Disconnected: ${socket.id}`);
        activeSocketConnections.delete(socket.id);
    });
})

const shutdown = () => {
    console.log("Shutting down server...");
    // Disconnect all sockets
    for (const socketId of activeSocketConnections) {
        SOCKET_IO.sockets.sockets.get(socketId)?.disconnect(true);
    }
    activeSocketConnections.clear();
    // Close the server
    webSocketServer.close(() => {
        console.info("WebSocket Server closed.");
        process.exit(0);
    });
};

webSocketServer.listen(8080, () => {
    console.info("Server Listening on port 8080")
})

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)