import { Dimension, system, world } from "@minecraft/server";

export class Dimensions {
    static OVERWORLD: string = "minecraft:overworld";
    static NETHER: string = "minecraft:nether";
    static END: string = "minecraft:the_end";

    static getAllDimensionIds(): string[] {
        return [
            Dimensions.OVERWORLD,
            Dimensions.NETHER,
            Dimensions.END
        ];
    }

    static getDimension(dimensionId: string): Dimension {
        return world.getDimension(dimensionId);
    }
}