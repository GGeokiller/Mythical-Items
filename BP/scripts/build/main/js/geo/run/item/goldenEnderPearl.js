import { system, world } from "@minecraft/server";
import { MythicalItems } from "../../util/enum/ExternalItems";
import { giveItem, isItemCooldownReady, getBlockFacelocation } from "../../util/functions/mainFunctions";
world.beforeEvents.itemUse.subscribe((eventData) => {
    if (eventData.itemStack.typeId !== MythicalItems.GoldenEnderPearl)
        return;
    useGoldenEnderPearl(eventData);
});
function useGoldenEnderPearl(eventData) {
    const { source: player, itemStack, cancel } = eventData;
    system.runTimeout(() => {
        if (!isItemCooldownReady(player, itemStack) && itemStack.amount > 1)
            return;
        let blockRayCast = player.getBlockFromViewDirection({ maxDistance: 96, includeLiquidBlocks: false, includePassableBlocks: false });
        const blockFromRay = blockRayCast?.block;
        if (!blockFromRay) {
            giveItem(player, MythicalItems.GoldenEnderPearl, 1);
            return;
        }
        else {
            const blockAbove = blockFromRay?.above(1) || undefined;
            let teleportLocation;
            if (!blockAbove)
                return;
            if (blockAbove?.typeId !== "minecraft:air") {
                teleportLocation = getBlockFacelocation(blockFromRay, blockRayCast.face);
            }
            else {
                teleportLocation = blockFromRay.above(1)?.center() ?? player.location;
            }
            player.teleport(teleportLocation);
            player.playSound("mob.shulker.teleport", { volume: 100, pitch: 1, location: teleportLocation });
        }
    }, 0);
}
