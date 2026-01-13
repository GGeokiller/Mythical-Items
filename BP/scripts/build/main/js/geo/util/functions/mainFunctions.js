import { system, world } from "@minecraft/server";
export function getDistanceVector3(vector1, vector2) {
    const dx = vector2.x - vector1.x;
    const dy = vector2.y - vector1.y;
    const dz = vector2.z - vector1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
export function sendMessageToWorld(message) {
    system.run(() => {
        world.sendMessage(message);
    });
}
;
