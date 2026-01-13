import { world } from "@minecraft/server";
import { addonInfo } from "../../addon/info";

const JOIN_MESSAGE = `§9${addonInfo.title} v${addonInfo.version} (${addonInfo.mcversion}) Loaded Successfully by Geokiller`
const ADMIN_MESSAGE = `§8[§9${addonInfo.title}§8] §cYou have admin permissions! Use §e/config§c to access the configuration panel.`

world.afterEvents.playerSpawn.subscribe(({player, initialSpawn}) => {
    if (!initialSpawn) return;
    player.sendMessage(JOIN_MESSAGE);
    if (player.playerPermissionLevel >= 2 || player.commandPermissionLevel >= 1) {
        player.sendMessage(ADMIN_MESSAGE);
    }
})

console.warn(`${addonInfo.title} (${addonInfo.mcversion}) Loaded Successfully`);
