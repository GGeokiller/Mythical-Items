import { world } from "@minecraft/server";
import { ItemRarityUtil } from "./itemRarity";
import { ExternalItems } from "../enum/ExternalItems";
import { mojangItems } from "../enum/MojangItems";
class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}
const uncommon = "§r§l§aUncommon";
const rare = "§r§l§bRare";
const epic = "§r§l§uEpic";
const legendary = "§r§l§6Legendary";
const mythical = "§r§l§cMythic";
const murasama = "§r§l§4Murasama";
const CALIDAD_REEMPLAZA_ESTO = "Default_quality";
const RarityToLore = {
    common: "§fCommon",
    uncommon: "§aUncommon",
    rare: "§bRare",
    epic: "§uEpic",
    legendary: "§6Legendary",
    mythical: "§cMythic",
    murasama: "§4Murasama"
};
const ItemArray = [
    new loreItem("sampleText", ["", `§r§7Rarity: ${RarityToLore[ItemRarityUtil.getItemRarity("sampleText")]} `, "", "§r§9ITEM LORE HERE"]),
];
ItemArray.push(new loreItem(mojangItems.NetheriteSword, ["", `§r§7Rarity: ${RarityToLore[ItemRarityUtil.getItemRarity(mojangItems.NetheriteSword)]} `, "", "§r§9SampleText"]));
for (const addon of Object.values(ExternalItems)) {
    for (const [rarity, items] of Object.entries(addon)) {
        for (const itemData of Object.values(items)) {
            const id = itemData.id;
            const loreText = [
                "",
                `§r§7Rarity: ${RarityToLore[rarity]}`,
                "",
                ...(itemData.lore ?? ["§r§9Custom item"])
            ];
            ItemArray.push(new loreItem(id, loreText));
        }
    }
}
world.afterEvents.playerInventoryItemChange.subscribe(({ itemStack, inventoryType, player, slot }) => {
    if (!itemStack)
        return;
    let findLore = ItemArray.find(x => x.itemId == itemStack?.typeId);
    let lore = itemStack?.getLore();
    if (!findLore)
        return;
    if (lore?.length > 0)
        return;
    itemStack.setLore(findLore.lore);
    const playerContainer = player.getComponent("inventory")?.container;
    playerContainer?.setItem(slot, itemStack);
});
world.afterEvents.entitySpawn.subscribe((ev) => {
    try {
        let entity = ev.entity;
        if (entity.typeId == "minecraft:item") {
            let itemCom = entity.getComponent("item")?.itemStack;
            let item = itemCom;
            let findLore = ItemArray.find(x => x.itemId == item?.typeId);
            let lore = item?.getLore();
            if (!findLore)
                return;
            if (!lore)
                return;
            if (lore?.length > 0)
                return;
            let tags = entity.getTags();
            if (!item)
                return;
            item.setLore(findLore.lore);
            let nuevoItem = entity?.dimension?.spawnItem(item, entity?.location);
            for (const tag of tags) {
                nuevoItem.addTag(tag);
            }
            entity.remove();
        }
    }
    catch { }
});
