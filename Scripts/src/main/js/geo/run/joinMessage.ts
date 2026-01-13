import { world } from "@minecraft/server";
import { addonInfo } from "../../addon/info";

const JOIN_MESSAGE = `§9${addonInfo.title} v${addonInfo.version} (${addonInfo.mcversion}) Loaded Successfully by Geokiller`

world.afterEvents.playerSpawn.subscribe(({player, initialSpawn}) => {
    if (!initialSpawn) return;
    player.sendMessage(JOIN_MESSAGE);
})

console.warn(`${addonInfo.title} (${addonInfo.mcversion}) Loaded Successfully`);
