import { world } from "@minecraft/server";
import { ItemRarityUtil } from "./itemRarity";
import { ExternalItems } from "../enum/ExternalItems";
class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}
const RarityToLore = {
    common: "§fCommon",
    uncommon: "§aUncommon",
    rare: "§bRare",
    epic: "§uEpic",
    legendary: "§6Legendary",
    mythical: "§cMythic",
    murasama: "§4Murasama"
};
export const ItemLoreArray = [
    new loreItem("sampleText", ["", `§r§7Rarity: ${RarityToLore[ItemRarityUtil.getItemRarity("sampleText")]} `, "", "§r§9ITEM LORE HERE"]),
];
for (const addon of Object.values(ExternalItems)) {
    for (const [rarity, items] of Object.entries(addon)) {
        for (const itemData of Object.values(items)) {
            if (itemData.raritylore === false)
                continue;
            const id = itemData.id;
            const loreText = [];
            loreText.push("", `§r§7Rarity: ${RarityToLore[rarity]}`);
            if (itemData.lore && itemData.lore.length > 0) {
                loreText.push(...itemData.lore);
            }
            ItemLoreArray.push(new loreItem(id, loreText));
        }
    }
}
export function setLoreToItem(itemStack, lore) {
    itemStack.setLore(lore);
}
world.afterEvents.playerInventoryItemChange.subscribe(({ itemStack, inventoryType, player, slot }) => {
    if (!itemStack)
        return;
    let findLore = ItemLoreArray.find(x => x.itemId == itemStack?.typeId);
    let lore = itemStack?.getLore();
    if (!findLore)
        return;
    if (lore?.length > 0)
        return;
    setLoreToItem(itemStack, findLore.lore);
    const playerContainer = player.getComponent("inventory")?.container;
    playerContainer?.setItem(slot, itemStack);
});
world.afterEvents.entitySpawn.subscribe((ev) => {
    try {
        let entity = ev.entity;
        if (entity.typeId == "minecraft:item") {
            let itemCom = entity.getComponent("item")?.itemStack;
            let item = itemCom;
            let findLore = ItemLoreArray.find(x => x.itemId == item?.typeId);
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
            setLoreToItem(item, findLore.lore);
            let nuevoItem = entity?.dimension?.spawnItem(item, entity?.location);
            for (const tag of tags) {
                nuevoItem.addTag(tag);
            }
            entity.remove();
        }
    }
    catch { }
});
