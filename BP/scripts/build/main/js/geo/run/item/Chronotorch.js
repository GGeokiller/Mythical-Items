import { world, system } from "@minecraft/server";
import { ItemUseBeforeListener } from "../../listeners/itemUse";
import { MythicalItems } from "../../util/enum/ExternalItems";
import { GeoRandom, getPlayerExperienceLevel, removePlayerExperienceLevels } from "../../util/functions/mainFunctions";
ItemUseBeforeListener.register((eventData) => {
    if (eventData.itemStack?.typeId !== MythicalItems.Chronotorch)
        return;
    useChronotorch(eventData);
});
function useChronotorch(eventData) {
    system.run(() => {
        const player = eventData.source;
        if (getPlayerExperienceLevel(player) < 5) {
            runChronotorchEffectFailure(player);
            return;
        }
        removePlayerExperienceLevels(player, 5);
        runChronotorchEffectSuccess(player);
    });
}
function runChronotorchEffectSuccess(player) {
    player.playSound("random.levelup", { volume: 1, pitch: GeoRandom(0.8, 1.2) });
    let newTime = world.getTimeOfDay() + 6000;
    if (newTime > 24000)
        newTime -= 24000;
    world.setTimeOfDay(newTime);
}
function runChronotorchEffectFailure(player) {
    player.playSound("random.break", { volume: 1, pitch: GeoRandom(0.8, 1.2) });
    player.sendMessage({ rawtext: [{ translate: "geo.chronotorch.failure" }] });
}
