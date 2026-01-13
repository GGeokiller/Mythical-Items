import {
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandResult,
  CustomCommandStatus,
  Player,
  system,
  world,
} from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { sendMessageToWorld } from "../util/functions/mainFunctions";

system.beforeEvents.startup.subscribe(() => {
    system.run(() => {
            if (world.getDynamicProperty("geo:particle_density") === undefined) {
            //sendMessageToWorld("§a[Mythical Items] §fSetting default particle density to §b5§f.");
            world.setDynamicProperty("geo:particle_density", 10);
        }
    })

});

system.beforeEvents.startup.subscribe((init) => {
  const configCommand = {
    name: "mythical:config",
    description: "Basic Configuration for particles",
    permissionLevel: CommandPermissionLevel.Admin,
  };

  init.customCommandRegistry.registerCommand(configCommand, handleConfigCommand);
});

function handleConfigCommand(origin: CustomCommandOrigin,  ...args: any[]): CustomCommandResult | undefined {
    system.run(() => {
    const entity = origin.sourceEntity;
    if (!(entity instanceof Player)) return;
    let particleDensity = world.getDynamicProperty("geo:particle_density");
    if (typeof particleDensity !== "number") particleDensity = 10;
    const form = new ModalFormData()
    form.title("Mythical Items Configuration");
    form.divider()
    form.slider("Particle Density", 1, 20, {valueStep: 1, defaultValue: 21 - particleDensity});
    form.divider()
    
        form.show(entity).then((response) => {
            if (response.canceled) return;
            if (response.formValues === undefined) return;
            let particleDensity = response.formValues[1];
            if (typeof particleDensity !== "number") return;
            world.setDynamicProperty("geo:particle_density", 21 - particleDensity);
            world.sendMessage(`§a[Mythical Items] §fParticle Density set to §b${particleDensity}§f.`);
        })
    })

  return { status: CustomCommandStatus.Success };
}

