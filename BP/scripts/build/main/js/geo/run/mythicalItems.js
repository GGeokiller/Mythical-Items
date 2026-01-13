import { MolangVariableMap, system, world } from "@minecraft/server";
import { EntitySpawnListener } from "../listeners/entitySpawn";
import { Dimensions } from "../util/enum/Dimensions";
import { sendMessageToWorld } from "../util/functions/mainFunctions";
import { Entities } from "../util/enum/Entities";
import { ItemRarity, ItemRarityColors, ItemRarityUtil } from "../util/functions/itemRarity";
for (const dimensionId of Dimensions.getAllDimensionIds()) {
    system.run(() => {
        const dimension = Dimensions.getDimension(dimensionId);
        sendMessageToWorld(`Registering entity spawn listener for dimension: ${dimensionId}`);
    });
}
EntitySpawnListener.register((event) => {
    const { entity, cause } = event;
    if (entity?.typeId !== Entities.item)
        return;
    const itemComponent = entity.getComponent("minecraft:item");
    if (!itemComponent)
        return;
    const itemStack = itemComponent.itemStack;
    const itemId = itemStack.typeId;
    let itemRarity = ItemRarityUtil.getItemRarity(itemId);
    let enchantable = itemStack.getComponent("enchantable");
    let enchantableArray = enchantable?.getEnchantments() ?? [];
    if (enchantableArray.length > 0 && (itemRarity === ItemRarity.COMMON || itemRarity === ItemRarity.UNCOMMON)) {
        itemRarity = ItemRarity.RARE;
    }
    entity.addTag(`itemRarity:${itemRarity}`);
});
let tickCounter = 0;
system.runInterval(() => {
    tickCounter++;
    let particleDensity = world.getDynamicProperty("geo:particle_density");
    if (typeof particleDensity !== "number")
        particleDensity = 10;
    if (tickCounter % particleDensity !== 0)
        return;
    runParticles();
}, 1);
function runParticles() {
    for (const dimensionId of Dimensions.getAllDimensionIds()) {
        const dimension = Dimensions.getDimension(dimensionId);
        for (const rarity of ItemRarityUtil.getAllRarities()) {
            const items = dimension.getEntities({
                type: Entities.item,
                tags: [`itemRarity:${rarity}`],
            });
            items.forEach((itemEntity) => {
                executeItemRarity(itemEntity, rarity);
            });
        }
    }
}
function executeItemRarity(item, rarity) {
    let velocity = item.getVelocity();
    if (velocity.y !== 0 && !item.isInWater)
        return;
    spawnBlighParticle(item, rarity);
}
function spawnBlighParticle(itemEntity, rarity) {
    let molangConfig = new MolangVariableMap();
    let red = ItemRarityColors[rarity].r / 255;
    let green = ItemRarityColors[rarity].g / 255;
    let blue = ItemRarityColors[rarity].b / 255;
    molangConfig.setFloat("red", red > 0 ? red : 0.1);
    molangConfig.setFloat("green", green > 0 ? green : 0.1);
    molangConfig.setFloat("blue", blue > 0 ? blue : 0.1);
    molangConfig.setFloat("alpha", 1);
    let entityLocation = itemEntity.location;
    if (!entityLocation)
        return;
    if (!itemEntity.isValid)
        return;
    try {
        itemEntity.dimension.spawnParticle("one:item_blight", { x: entityLocation.x, y: entityLocation.y + 0.35, z: entityLocation.z }, molangConfig);
        itemEntity.dimension.spawnParticle("one:item_lights", { x: entityLocation.x, y: entityLocation.y + 0.35, z: entityLocation.z }, molangConfig);
    }
    catch { }
}
