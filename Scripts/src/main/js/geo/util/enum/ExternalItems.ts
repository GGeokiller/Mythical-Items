import { LootTableReference } from "@minecraft/server";
import { ItemRarity, ItemRarityType } from "../functions/itemRarity";

export type ExternalItemData = {
    id: string;
    lore?: string[];
    raritylore?: boolean
};

export type ExternalItemsType = Record<
    string,
    Partial<Record<ItemRarityType, Record<string, ExternalItemData>>>
>;

export const ExternalItems: ExternalItemsType = {
    SampleAddon: {
        mythical: {
            ItemSample: { id: "sample_addon:item_sample", lore: undefined, raritylore: false }
        },
        uncommon: {
            ItemExample: { id: "sample_addon:item_example", lore: undefined, raritylore: false }
        }
    },
    MythicalItems: {
        rare: {
            GoldenEnderPearl: { id: "geo:golden_ender_pearl", lore: undefined, raritylore: false }
        }
    }
};

export const MythicalItems = {
    GoldenEnderPearl: "geo:golden_ender_pearl",
}