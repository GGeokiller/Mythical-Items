import { world, ItemUseBeforeEvent, ItemUseBeforeEventSignal, ItemUseAfterEvent } from "@minecraft/server";

export class ItemUseBeforeListener {
    private static callbacks: Array<(event: ItemUseBeforeEvent) => void> = [];
    private static initialized = false;

    static register(callback: (event: ItemUseBeforeEvent) => void): void {
        this.callbacks.push(callback);

        if (!this.initialized) {
            this.initialized = true;

            world.beforeEvents.itemUse.subscribe((event) => {
                for (const cb of this.callbacks) {
                    cb(event);
                    if (event.cancel) break;
                }
            });
        }
    }
}

export class ItemUseAfterListener {
    private static callbacks: Array<(event: ItemUseAfterEvent) => void> = [];
    private static initialized = false;

    static register(callback: (event: ItemUseAfterEvent) => void): void {
        this.callbacks.push(callback);

        if (!this.initialized) {
            this.initialized = true;

            world.afterEvents.itemUse.subscribe((event) => {
                for (const cb of this.callbacks) {
                    cb(event);
                }
            });
        }
    }
}