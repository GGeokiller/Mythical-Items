import { Block, Direction, ItemUseBeforeEvent, Player, system, Vector3, world } from "@minecraft/server";
import { MythicalItems } from "../../util/enum/ExternalItems";
import { addVector3, giveItem, isItemCooldownReady, getBlockFacelocation, GeoRandom } from "../../util/functions/mainFunctions";
import { RunTick } from "../../listeners/tick";
import { ItemUseBeforeListener } from "../../listeners/itemUse";

/* world.beforeEvents.itemUse.subscribe((eventData) => {
    if (eventData.itemStack.typeId !== MythicalItems.GoldenEnderPearl) return;
    useGoldenEnderPearl(eventData);
}); */

/* ItemUseBeforeListener.register((eventData: ItemUseBeforeEvent) => {
    if (eventData.itemStack.typeId !== MythicalItems.GoldenEnderPearl) return;
    useGoldenEnderPearl(eventData);
});

function useGoldenEnderPearl(eventData: ItemUseBeforeEvent) {
    const {source: player, itemStack, cancel} = eventData;
    system.runTimeout(() => {
        if (!isItemCooldownReady(player, itemStack) && itemStack.amount > 1) return;
        let blockRayCast = player.getBlockFromViewDirection({maxDistance: 96, includeLiquidBlocks: false, includePassableBlocks: false});
        const blockFromRay = blockRayCast?.block
        if (!blockFromRay) {
            runGoldenEnderPearlTeleportFailure(player);
            giveItem(player, MythicalItems.GoldenEnderPearl, 1);
            return;
        } else {
            const blockAbove = blockFromRay?.above(1) || undefined;
            let teleportLocation;
            if (!blockAbove) return;
            if (blockAbove?.typeId !== "minecraft:air") {
                teleportLocation = getBlockFacelocation(blockFromRay, blockRayCast.face);
            } else {
                teleportLocation = blockFromRay.above(1)?.center() ?? player.location;
            }
            runGoldenEnderPearlTeleportSuccess(player, teleportLocation);
        }
    }, 0)
}

function runGoldenEnderPearlTeleportSuccess(player: Player, location: Vector3) {
    player.teleport(location);
    player.playSound("mob.shulker.teleport", {volume: 100, pitch: GeoRandom(0.8, 1.2), location: location});
}

function runGoldenEnderPearlTeleportFailure(player: Player) {
    player.playSound("random.break", {volume: 1, pitch: GeoRandom(0.8, 1.2)});
    player.sendMessage({rawtext: [{translate: "geo.golden_ender_pearl.failure"}]})
} */