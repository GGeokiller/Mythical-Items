import { ItemStack, world } from "@minecraft/server";
import { chanceOutOf, GeoRandomInt } from "../../util/functions/mainFunctions";
import { MythicalItems } from "../../util/enum/ExternalItems";
world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;
    if (!entity.getComponent("type_family")?.hasTypeFamily("monster"))
        return;
    handleMonsterDeath(entity);
});
function handleMonsterDeath(entity) {
    let randomDropAmout = GeoRandomInt(1, 3);
    if (!chanceOutOf(1, 10))
        return;
    let itemStack = new ItemStack(MythicalItems.SoulOfDarkness, 1);
    for (let i = 0; i < randomDropAmout; i++) {
        entity.dimension.spawnItem(itemStack, entity.location);
    }
}
