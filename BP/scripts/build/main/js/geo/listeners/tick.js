import { system } from "@minecraft/server";
export class RunTick {
    static register(callback = () => { }, tickInterval = 1) {
        return system.runInterval(callback, tickInterval);
    }
    static clear(runId = 0) {
        system.clearRun(runId);
    }
}
