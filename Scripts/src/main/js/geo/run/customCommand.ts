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

const defaultProperties = {
  particle_density: 10,
  enable_particles: true,
}

system.beforeEvents.startup.subscribe(() => {
    system.run(() => {
        for (const key in defaultProperties) {
            if (world.getDynamicProperty(`geo:${key}`) === undefined) {
              world.setDynamicProperty(`geo:${key}`, (defaultProperties as any)[key]);
              console.warn(`Set default dynamic property geo:${key} to ${(defaultProperties as any)[key]}`);
            }
        }  
    })
});

system.beforeEvents.startup.subscribe((init) => {
  const configCommand = {
    name: "mythical:config",
    description: "Basic Configuration for particles",
    permissionLevel: CommandPermissionLevel.GameDirectors,
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
    form.toggle("Enable Particles", {defaultValue: world.getDynamicProperty("geo:enable_particles") as boolean ?? true});
    form.divider()

        form.show(entity).then((response) => {
            if (response.canceled) return;
            if (response.formValues === undefined) return;
            let particleDensity = response.formValues[1];
            let enableParticles = response.formValues[3];
            if (typeof particleDensity !== "number") return;
            if (typeof enableParticles !== "boolean") return;
            world.setDynamicProperty("geo:enable_particles", enableParticles);
            world.setDynamicProperty("geo:particle_density", 21 - particleDensity);
            world.sendMessage(`§a[Mythical Items] §fParticle Density set to §b${particleDensity}§f. Particles are now §b${enableParticles ? "enabled" : "disabled"}§f.`);
        })
    })

  return { status: CustomCommandStatus.Success };
}

