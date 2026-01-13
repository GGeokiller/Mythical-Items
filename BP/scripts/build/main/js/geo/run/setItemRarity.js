import { system, world } from "@minecraft/server";
import { EntitySpawnListener } from "../listeners/entitySpawn";
import { Dimensions } from "../util/enum/Dimensions";
import { sendMessageToWorld } from "../util/functions/mainFunctions";
import { Entities } from "../util/enum/Entities";
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
    world.sendMessage(`An item with ID ${itemId} has spawned.`);
});
