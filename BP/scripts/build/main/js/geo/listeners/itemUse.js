import { world } from "@minecraft/server";
export class ItemUseBeforeListener {
    static register(callback) {
        this.callbacks.push(callback);
        if (!this.initialized) {
            this.initialized = true;
            world.beforeEvents.itemUse.subscribe((event) => {
                for (const cb of this.callbacks) {
                    cb(event);
                    if (event.cancel)
                        break;
                }
            });
        }
    }
}
ItemUseBeforeListener.callbacks = [];
ItemUseBeforeListener.initialized = false;
export class ItemUseAfterListener {
    static register(callback) {
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
ItemUseAfterListener.callbacks = [];
ItemUseAfterListener.initialized = false;
