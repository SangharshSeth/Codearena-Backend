import { MatchmakingData, MatchmakingQueue } from "./main.ts";

export const findOpponent = (data: MatchmakingData, queue: MatchmakingQueue) => {
    const category = data.category;
    const opponent = queue.items.find((item) => {
        item.category === category
    })
    return opponent?.socketId;
}