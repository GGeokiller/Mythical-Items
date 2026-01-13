import { system, Vector3, world } from "@minecraft/server";

/**
 * @param {Vector3} vector1 - The first Vector3 object.
 * @param {Vector3} vector2 - The second Vector3 object.
 * @returns {number} The distance between the two vectors.
 */

export function getDistanceVector3(vector1: Vector3, vector2: Vector3): number {
    const dx = vector2.x - vector1.x;
    const dy = vector2.y - vector1.y;
    const dz = vector2.z - vector1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * 
 * @param {string} message - The message to send to the world.
 * @returns {void}
 */

export function sendMessageToWorld(message: string): void {
    system.run(() => {
        world.sendMessage(message);
    })
};