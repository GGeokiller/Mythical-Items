import { ItemStack, system, world } from "@minecraft/server";
import { ItemLoreArray, setLoreToItem } from "./setItemLore";
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
export function giveItem(player, itemId, amount = 1) {
    let itemStack = new ItemStack(itemId, amount);
    let findLore = ItemLoreArray.find(x => x.itemId == itemId);
    if (findLore) {
        setLoreToItem(itemStack, findLore.lore);
    }
    let playerInventory = player.getComponent("inventory")?.container;
    if (!playerInventory)
        return;
    if (playerInventory.emptySlotsCount <= 0) {
        player.dimension.spawnItem(itemStack, player.location);
    }
    else {
        playerInventory.addItem(itemStack);
    }
}
export function isItemCooldownReady(player, itemStack) {
    const cooldownComponent = itemStack.getComponent("cooldown");
    if (!cooldownComponent)
        return true;
    const cooldownTicksRemaining = cooldownComponent.getCooldownTicksRemaining(player);
    const totalCooldownTicks = cooldownComponent.cooldownTicks;
    const isReady = (totalCooldownTicks - 1) === cooldownTicksRemaining;
    return isReady;
}
export function addVector3(vector1, vector2) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z,
    };
}
export const Directions = {
    Down: { x: 0, y: -1, z: 0 },
    Up: { x: 0, y: 1, z: 0 },
    North: { x: 0, y: 0, z: -1 },
    South: { x: 0, y: 0, z: 1 },
    West: { x: -1, y: 0, z: 0 },
    East: { x: 1, y: 0, z: 0 },
};
export function getBlockFacelocation(block, blockFace) {
    return addVector3(block.center(), Directions[blockFace]);
}
export function getPlayerExperienceLevel(player) {
    const xp = player.getTotalXp();
    let total = 0;
    let level = 0;
    while (true) {
        let xpToNext;
        if (level < 16) {
            xpToNext = 2 * level + 7;
        }
        else if (level < 31) {
            xpToNext = 5 * level - 38;
        }
        else {
            xpToNext = 9 * level - 158;
        }
        if (total + xpToNext > xp)
            break;
        total += xpToNext;
        level++;
    }
    return level;
}
export function removePlayerExperienceLevels(player, levelsToRemove) {
    player.runCommand(`xp -${levelsToRemove}L @s`);
}
;
export function GeoRandom(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}
export function GeoRandomInt(min, max) {
    return Math.floor(GeoRandom(min, max));
}
export function chancePercentaje(percent) {
    return GeoRandomInt(1, 100) <= percent;
}
export function chanceOutOf(chance, outOf) {
    if (outOf <= 0)
        return false;
    if (chance <= 0)
        return false;
    if (chance >= outOf)
        return true;
    return GeoRandomInt(1, outOf) <= chance;
}
