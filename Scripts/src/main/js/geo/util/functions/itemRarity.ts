import {mojangItems} from "../enum/MojangItems"
import { ExternalItems } from "../enum/ExternalItems";

export const ItemRarityColors = {
    common: {  r: 255, g: 255, b: 255},
    uncommon: { r: 30, g: 255, b: 0},
    rare: { r: 0, g: 112, b: 221},
    epic: { r: 163, g: 53, b: 238},
    legendary: { r: 230, g: 204, b: 128},
    mythical: { r: 240, g: 49, b: 49},
}

export const ItemRarity = {
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
    MYTHICAL: "mythical",
} as const;

export type ItemRarityType =
    typeof ItemRarity[keyof typeof ItemRarity];


const MYTHICAL_ITEMS = new Set<string>([
/*     mojangItems.DragonEgg,
    mojangItems.Barrier,
    mojangItems.Jigsaw,
    mojangItems.LightBlock0,
    mojangItems.LightBlock1,
    mojangItems.LightBlock2,
    mojangItems.LightBlock3,
    mojangItems.LightBlock4,
    mojangItems.LightBlock5,
    mojangItems.LightBlock6,
    mojangItems.LightBlock7,
    mojangItems.LightBlock8,
    mojangItems.LightBlock9,
    mojangItems.LightBlock10,
    mojangItems.LightBlock11,
    mojangItems.LightBlock12,
    mojangItems.LightBlock13,
    mojangItems.LightBlock14,
    mojangItems.LightBlock15,
    mojangItems.CommandBlock,
    mojangItems.RepeatingCommandBlock,
    mojangItems.ChainCommandBlock,
    mojangItems.StructureBlock,
    mojangItems.StructureVoid,
    mojangItems.CommandBlockMinecart, */
]);

const LEGENDARY_ITEMS = new Set<string>([
/*     mojangItems.Elytra,
    mojangItems.DragonHead,
    mojangItems.SilenceArmorTrimSmithingTemplate,
    mojangItems.Mace,
    mojangItems.HeavyCore, */
]);

const EPIC_ITEMS = new Set<string>([
/*     mojangItems.Elytra,
    mojangItems.FlowBannerPattern,
    mojangItems.GusterBannerPattern,
    mojangItems.SkullBannerPattern,
    mojangItems.EnchantedGoldenApple,
    mojangItems.Trident,
    mojangItems.NetherStar,
    mojangItems.EnchantedBook,
    mojangItems.WardArmorTrimSmithingTemplate,
    mojangItems.EyeArmorTrimSmithingTemplate,
    mojangItems.VexArmorTrimSmithingTemplate,
    mojangItems.SpireArmorTrimSmithingTemplate,
    mojangItems.WitherSkeletonSkull,
    mojangItems.MusicDiscPigstep,
    mojangItems.MusicDiscOtherside,
    mojangItems.MusicDiscCreator,
    mojangItems.Beacon,
    mojangItems.NetheriteIngot,
    mojangItems.NetheriteBlock,
    mojangItems.NetheriteAxe,
    mojangItems.NetheriteBoots,
    mojangItems.NetheriteChestplate,
    mojangItems.NetheriteHelmet,
    mojangItems.NetheriteHoe,
    mojangItems.NetheriteLeggings,
    mojangItems.NetheritePickaxe,
    mojangItems.NetheriteScrap,
    mojangItems.NetheriteShovel,
    mojangItems.NetheriteSword,
    mojangItems.NetheriteHorseArmor,
    mojangItems.NetheriteNautilusArmor,
    mojangItems.NetheriteSpear,
    mojangItems.MusicDiscLavaChicken */
]);

const RARE_ITEMS = new Set<string>([
/*     mojangItems.Diamond,
    mojangItems.CreeperBannerPattern,
    mojangItems.PlayerHead,
    mojangItems.ZombieHead,
    mojangItems.SkeletonSkull,
    mojangItems.PiglinHead,
    mojangItems.CreeperHead,
    mojangItems.MusicDiscTears,
    mojangItems.Book,
    mojangItems.SnifferEgg,
    mojangItems.ChainmailHelmet,
    mojangItems.ChainmailChestplate,
    mojangItems.ChainmailLeggings,
    mojangItems.ChainmailBoots,
    mojangItems.RecoveryCompass,
    mojangItems.DiscFragment5,
    mojangItems.NautilusShell,
    mojangItems.EchoShard,
    mojangItems.GoatHorn,
    mojangItems.OminousBottle,
    mojangItems.NetheriteUpgradeSmithingTemplate,
    mojangItems.SentryArmorTrimSmithingTemplate,
    mojangItems.DuneArmorTrimSmithingTemplate,
    mojangItems.CoastArmorTrimSmithingTemplate,
    mojangItems.WildArmorTrimSmithingTemplate,
    mojangItems.TideArmorTrimSmithingTemplate,
    mojangItems.SnoutArmorTrimSmithingTemplate,
    mojangItems.RibArmorTrimSmithingTemplate,
    mojangItems.WayfinderArmorTrimSmithingTemplate,
    mojangItems.ShaperArmorTrimSmithingTemplate,
    mojangItems.RaiserArmorTrimSmithingTemplate,
    mojangItems.HostArmorTrimSmithingTemplate,
    mojangItems.FlowArmorTrimSmithingTemplate,
    mojangItems.BoltArmorTrimSmithingTemplate,
    mojangItems.MusicDisc13,
    mojangItems.MusicDiscCat,
    mojangItems.MusicDiscBlocks,
    mojangItems.MusicDiscChirp,
    mojangItems.MusicDiscFar,
    mojangItems.MusicDiscMall,
    mojangItems.MusicDiscMellohi,
    mojangItems.MusicDiscStal,
    mojangItems.MusicDiscStrad,
    mojangItems.MusicDiscWard,
    mojangItems.MusicDisc11,
    mojangItems.MusicDiscWait,
    mojangItems.MusicDisc5,
    mojangItems.MusicDiscRelic,
    mojangItems.MusicDiscCreatorMusicBox,
    mojangItems.MusicDiscPrecipice,
    mojangItems.TotemOfUndying,
    mojangItems.ExperienceBottle,
    mojangItems.Conduit,
    mojangItems.HeartOfTheSea,
    mojangItems.DragonBreath */
]);

const UNCOMMON_ITEMS = new Set<string>([
/*     mojangItems.IronIngot,
    mojangItems.GoldIngot,
    mojangItems.DiamondBlock,
    mojangItems.GoldBlock,
    mojangItems.IronBlock,
    mojangItems.LapisBlock,
    mojangItems.EmeraldBlock,
    mojangItems.RedstoneBlock,
    mojangItems.CoalBlock,
    mojangItems.Diamond,
    mojangItems.Emerald,
    mojangItems.LapisLazuli,
    mojangItems.Redstone,
    mojangItems.Coal,
    mojangItems.Book,
    mojangItems.Compass,
    mojangItems.GoldenApple,
    mojangItems.GoldenCarrot,
    mojangItems.EnchantingTable,
    mojangItems.EnderChest,
    mojangItems.Anvil,
    mojangItems.ChippedAnvil,
    mojangItems.DamagedAnvil,
    mojangItems.ShulkerShell,
    mojangItems.RedShulkerBox,
    mojangItems.BlueShulkerBox,
    mojangItems.GreenShulkerBox,
    mojangItems.YellowShulkerBox,
    mojangItems.PurpleShulkerBox,
    mojangItems.CyanShulkerBox,
    mojangItems.WhiteShulkerBox,
    mojangItems.BlackShulkerBox,
    mojangItems.BrownShulkerBox,
    mojangItems.LightGrayShulkerBox,
    mojangItems.GrayShulkerBox,
    mojangItems.MagentaShulkerBox,
    mojangItems.OrangeShulkerBox,
    mojangItems.PinkShulkerBox,
    mojangItems.LightBlueShulkerBox,
    mojangItems.UndyedShulkerBox,
    mojangItems.NameTag,
    mojangItems.Saddle,
    mojangItems.IronHorseArmor,
    mojangItems.GoldenHorseArmor,
    mojangItems.DiamondHorseArmor,
    mojangItems.CryingObsidian,
    mojangItems.BreezeRod,
    mojangItems.EnderPearl,
    mojangItems.EnderEye,
    mojangItems.TrialKey,
    mojangItems.OminousTrialKey */
]);

const RARITY_TO_SET: Record<ItemRarityType, Set<string>> = {
    common: new Set(),
    uncommon: UNCOMMON_ITEMS,
    rare: RARE_ITEMS,
    epic: EPIC_ITEMS,
    legendary: LEGENDARY_ITEMS,
    mythical: MYTHICAL_ITEMS,
};



for (const [, addon] of Object.entries(ExternalItems)) {
    for (const [rarity, items] of Object.entries(addon)) {
        if (!(rarity in RARITY_TO_SET)) continue;

        const targetSet = RARITY_TO_SET[rarity as ItemRarityType];

        for (const itemData of Object.values(items)) {
            if (!itemData?.id) continue;
            if (targetSet.has(itemData.id)) continue;
            targetSet.add(itemData.id);
        }
    }
}




export class ItemRarityUtil {
    static getItemRarity(itemId: string): ItemRarityType {
        if (MYTHICAL_ITEMS.has(itemId)) return ItemRarity.MYTHICAL;
        if (LEGENDARY_ITEMS.has(itemId)) return ItemRarity.LEGENDARY;
        if (EPIC_ITEMS.has(itemId)) return ItemRarity.EPIC;
        if (RARE_ITEMS.has(itemId)) return ItemRarity.RARE;
        if (UNCOMMON_ITEMS.has(itemId)) return ItemRarity.UNCOMMON;

        return ItemRarity.COMMON;
    }

    static getAllRarities(): ItemRarityType[] {
        return Object.values(ItemRarity);
    }
}
