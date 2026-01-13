import { world } from "@minecraft/server";
export class EntitySpawnListener {
    static register(callback) {
        world.afterEvents.entitySpawn.subscribe(callback);
    }
}
