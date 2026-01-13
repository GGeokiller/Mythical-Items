import { mojangItems } from "./MojangItems";
export const ExternalItems = {
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
            GoldenEnderPearl: { id: "geo:golden_ender_pearl", lore: ["§r§9Instant teleportation, a Ender Pearl infused in gold"], raritylore: true }
        }
    },
    MojangItems: {
        mythical: {
            [mojangItems.DragonEgg]: { id: mojangItems.DragonEgg, lore: ["§r§9The dragon Egg"], raritylore: true },
        }
    }
};
export const MythicalItems = {
    GoldenEnderPearl: "geo:golden_ender_pearl",
};
