
import { Game, Tiles, Lists, Timers, Pixels } from './globals.js';
import { MakeShadow, CollisionDetection, CollisionDetectionRange, IsInView } from './functions.js';
import { keys } from './keys.js';

export class Level {
    constructor({name, active}) {
        this.name = name
        this.active = active
    }
    switch() {
        for(let level of levels)
            level.active = false;
        this.active = true;
        Game.player.level = this.name
    }
    draw() {
        const level = this.name
        /// DRAWING BG
        for(let obj of Lists.bgObjs)
            if(obj.level === level) obj.draw();
        /// DRAWING BG sctructures (non-items)
        for(let obj of Lists.floorObjs)
            if(!obj.item && obj.level === level) obj.draw();
        /// DRAWING ITEMS
        Game.c.save();
        MakeShadow(6, -3, 12, 'rgba(0,20,0,0.20)');
        for(let obj of Lists.floorObjs)
            if(obj.item  && obj.level === level) obj.draw();
        /// DRAWING PLAYER
        for(let obj of Lists.inventoryObjs)
            if(Game.player.image === Game.player.sprites.up) {
                obj.position = {
                    x: Game.player.position.x + Tiles(1) / 6,
                    y: Game.player.position.y + 20
                }
                obj.draw();
            }
        for(let obj of Lists.playerObjs)
            obj.draw();
        
        for(let obj of Lists.inventoryObjs) {
            if(Game.player.image === Game.player.sprites.left) {
                obj.position = {
                    x: Game.player.position.x + Tiles(1) / 6 - 20,
                    y: Game.player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
            else if(Game.player.image === Game.player.sprites.right) {
                obj.position = {
                    x: Game.player.position.x + Tiles(1) / 6 + 20,
                    y: Game.player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
            else if(Game.player.image === Game.player.sprites.down) {
                obj.position = {
                    x: Game.player.position.x + Tiles(1) / 6,
                    y: Game.player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
        }
        Game.c.restore();
        for(let obj of Lists.upperObjs)
            if(obj.level === level) obj.draw();
        /// DIALOGUE ICON
        if(Game.dialogueCloud === true) {
            Game.iconDialogue.position = {
                x: Game.player.position.x + Pixels(14),
                y: Game.player.position.y - Pixels(4)
            }
            Game.iconDialogue.draw();
        }
        /// INTERACT W/ OBJECTS
        for(let obj of Lists.interactableObjs) {
            if(Game.state !== "normal") return;
            if(obj.level === level && IsInView(obj) && CollisionDetectionRange(Game.player, obj, Game.interactionRange)) {
                Game.c.globalAlpha = 0.8;
                Game.iconInteract.position = {
                    x: Game.player.position.x,
                    y: Game.player.position.y - 75
                }
                Game.iconInteract.draw();
                Game.c.globalAlpha = 1;
                break;
            }
        }
        if(!Game.inventoryObj) {
            if(Game.state !== "normal") return;
            for(let obj of Lists.itemsObjs)
                if(obj.level === level && IsInView(obj) && obj.location === "floor" && CollisionDetection(Game.player, obj)) {
                    Game.c.globalAlpha = 0.8;
                    Game.iconPickup.position = {
                        x: obj.position.x,
                        y: obj.position.y - 75
                    }
                    Game.iconPickup.draw();
                    Game.c.globalAlpha = 1;
                    break;
                }
        }
        else {
        /// PUT DOWN ITEMS
            if(keys.p.pressed && Timers.pickupTimer.check() && Game.state === "normal") {
                Game.player.pickup(Game.inventoryObj);
            }
        }
        if(Game.debug)
            for(let obj of Lists.debugObjs)
                if(obj.level === level) obj.draw();
    }
}

export const level_Day1 = new Level({
    name: "day1",
    active: false
});
  
export const level_Home = new Level({
    name: "home",
    active: true
});
  
export const levels = [level_Home, level_Day1];