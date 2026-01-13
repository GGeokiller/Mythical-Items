import { system, world } from "@minecraft/server";

export class RunTick {
    /**
     * @param callback
     * @param tickInterval
     * @returns
     */
    static register(callback: () => void = () => {}, tickInterval: number = 1): number {
        return system.runInterval(callback, tickInterval);
    }

    /**
     * @param {number} runId
     */
    static clear(runId: number = 0): void {
        system.clearRun(runId);
    }
}