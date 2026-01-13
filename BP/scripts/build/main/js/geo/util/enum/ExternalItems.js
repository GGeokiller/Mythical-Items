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
            GoldenEnderPearl: { id: "geo:golden_ender_pearl", lore: ["§r§5Instant teleportation", "§r§5Pearl infused in gold"], raritylore: true }
        }
    },
    MojangItems: {
        mythical: {
            [mojangItems.DragonEgg]: { id: mojangItems.DragonEgg, lore: ["§r§5The dragon Egg"], raritylore: true },
        }
    }
};
export const MythicalItems = {
    GoldenEnderPearl: "geo:golden_ender_pearl",
};
