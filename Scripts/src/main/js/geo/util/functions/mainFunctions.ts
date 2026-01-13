import { Block, Direction, ItemStack, ItemType, Player, system, Vector3, world } from "@minecraft/server";

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

export function giveItem(player: Player, itemId: ItemType | string, amount: number = 1): void {
    let itemStack = new ItemStack(itemId, amount)
    let playerInventory = player.getComponent("inventory")?.container;
    if (!playerInventory) return;

    if (playerInventory.emptySlotsCount <= 0) {
        player.dimension.spawnItem(itemStack, player.location);
    } else {
        playerInventory.addItem(itemStack);
    }
}

export function isItemCooldownReady(player: Player, itemStack: ItemStack): boolean {
    const cooldownComponent = itemStack.getComponent("cooldown");
    if (!cooldownComponent) return true;
    const cooldownTicksRemaining = cooldownComponent.getCooldownTicksRemaining(player);
    const totalCooldownTicks = cooldownComponent.cooldownTicks;

    const isReady = (totalCooldownTicks - 1) === cooldownTicksRemaining;
    
    return isReady;
}

export function addVector3(vector1: Vector3, vector2: Vector3): Vector3 {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z,
    }
}

export const Directions = {
    Down: {x: 0, y: -1, z: 0},
    Up: {x: 0, y: 1, z: 0},
    North: {x: 0, y: 0, z: -1},
    South: {x: 0, y: 0, z: 1},
    West: {x: -1, y: 0, z: 0},
    East: {x: 1, y: 0, z: 0},
}

export function getBlockFacelocation(block: Block, blockFace: Direction ): Vector3 {
    return addVector3(block.center(), Directions[blockFace]);
}