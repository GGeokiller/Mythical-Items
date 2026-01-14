import { ExternalItems } from "../enum/ExternalItems";
export const ItemRarityColors = {
    common: { r: 255, g: 255, b: 255 },
    uncommon: { r: 30, g: 255, b: 0 },
    rare: { r: 0, g: 112, b: 221 },
    epic: { r: 163, g: 53, b: 238 },
    legendary: { r: 230, g: 204, b: 128 },
    mythical: { r: 240, g: 49, b: 49 },
};
export const ItemRarity = {
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
    MYTHICAL: "mythical",
};
const MYTHICAL_ITEMS = new Set([]);
const LEGENDARY_ITEMS = new Set([]);
const EPIC_ITEMS = new Set([]);
const RARE_ITEMS = new Set([]);
const UNCOMMON_ITEMS = new Set([]);
const RARITY_TO_SET = {
    common: new Set(),
    uncommon: UNCOMMON_ITEMS,
    rare: RARE_ITEMS,
    epic: EPIC_ITEMS,
    legendary: LEGENDARY_ITEMS,
    mythical: MYTHICAL_ITEMS,
};
for (const [, addon] of Object.entries(ExternalItems)) {
    for (const [rarity, items] of Object.entries(addon)) {
        if (!(rarity in RARITY_TO_SET))
            continue;
        const targetSet = RARITY_TO_SET[rarity];
        for (const itemData of Object.values(items)) {
            if (!itemData?.id)
                continue;
            if (targetSet.has(itemData.id))
                continue;
            targetSet.add(itemData.id);
        }
    }
}
export class ItemRarityUtil {
    static getItemRarity(itemId) {
        if (MYTHICAL_ITEMS.has(itemId))
            return ItemRarity.MYTHICAL;
        if (LEGENDARY_ITEMS.has(itemId))
            return ItemRarity.LEGENDARY;
        if (EPIC_ITEMS.has(itemId))
            return ItemRarity.EPIC;
        if (RARE_ITEMS.has(itemId))
            return ItemRarity.RARE;
        if (UNCOMMON_ITEMS.has(itemId))
            return ItemRarity.UNCOMMON;
        return ItemRarity.COMMON;
    }
    static getAllRarities() {
        return Object.values(ItemRarity);
    }
}
