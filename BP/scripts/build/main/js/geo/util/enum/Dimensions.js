import { world } from "@minecraft/server";
export class Dimensions {
    static getAllDimensionIds() {
        return [
            Dimensions.OVERWORLD,
            Dimensions.NETHER,
            Dimensions.END
        ];
    }
    static getDimension(dimensionId) {
        return world.getDimension(dimensionId);
    }
}
Dimensions.OVERWORLD = "minecraft:overworld";
Dimensions.NETHER = "minecraft:nether";
Dimensions.END = "minecraft:the_end";
