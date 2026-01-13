import { world, EntitySpawnAfterEvent } from "@minecraft/server";

export class EntitySpawnListener {
    /**
     * @param callback spawn event callback
     * @returns void
     */
    static register(callback: (event: EntitySpawnAfterEvent) => void): void {world.afterEvents.entitySpawn.subscribe(callback);
    }
}