import { MatchmakingData, MatchmakingQueue } from "./main.ts";

export const findOpponent = (data: MatchmakingData, queue: MatchmakingQueue) => {
    console.log(`Inside find opponent ${JSON.stringify(data)} ${JSON.stringify(queue)}`)
    const category = data.category;
    const opponent = queue.items.find((item) => {
        console.log(`Item category ${item.category} Original player CATEGO4Y ${category}`)
        return item.category === category
    })
    console.log(`Opponent ${opponent}`)
    return {
        opponentsSocketId: opponent?.socketId,
        opponentsName: opponent?.userName
    };
}