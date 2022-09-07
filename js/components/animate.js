import { Game, Timers, Lists, Tiles } from './globals.js';
import { keys } from './keys.js';
import { levels } from './level.js'
import { CollisionDetection, CollisionDetectionRange, HandlePlayerMovement, IsInView } from './functions.js';

/// ANIMATE
export const performanceChecker = {
  startTime: new Date().getTime(),
  endTime: 0,
  arrayFrames: [0, 0, 0, 0, 0],
  checkFrames: function(){
    if(Timers.performanceCheckTimer.check()) {
      this.endTime = new Date().getTime();
      let frames60 = (this.endTime - this.startTime) / Game.speed + 1
      this.arrayFrames.unshift(frames60);
      this.arrayFrames.pop();
      if(Game.movingSpeed > 6 && this.arrayFrames[0] < 400 && this.arrayFrames[1] < 400 && this.arrayFrames[2]  < 400 && this.arrayFrames[3]  < 400 && this.arrayFrames[4]  < 400) {
        Game.movingSpeed--;
        console.log(this.arrayFrames);
        console.log(Timers.performanceCheckTimer.limit + ` frames took: ${frames60}ms`);
        console.log('Setting MovingSpeed as ' + Game.movingSpeed)
      } 
      else if(Game.movingSpeed < 6 && this.arrayFrames[0] > 400 && this.arrayFrames[1] > 400 && this.arrayFrames[2]  > 400 && this.arrayFrames[3]  > 400 && this.arrayFrames[4]  > 400) {
        Game.movingSpeed++;
        console.log(this.arrayFrames);
        console.log(Timers.performanceCheckTimer.limit + ` frames took: ${frames60}ms`);
        console.log('Setting MovingSpeed as ' + Game.movingSpeed)
      }
      this.startTime = new Date().getTime();
    }
  }
};

export function animate() { 
  window.requestAnimationFrame(animate);
  performanceChecker.checkFrames();
  if(Timers.canvasDrawDelayTimer.check(Game.speed)) {
    Timers.canvasDrawDelayTimer.reset();
    for(let level of levels)
      if(level.active) level.draw();
  }
  /// DIALOGUE
  if(Game.state === "dialogue") {
    if(keys.enter.pressed && Game.active_dialogue && Timers.dialogueProceedTimer.check()) {
      Game.active_dialogue.next_line();
    }
    else Timers.dialogueProceedTimer.add();
  }
  /// PLAYER MOVEMENT
  if(Timers.movementDelayTimer.check(Game.playerMovementSpeed)) {
    Game.player.moving = false;
    if(Game.state !== "normal") return;
    if(keys.w.pressed)
      HandlePlayerMovement("North");
    if(keys.d.pressed)
      HandlePlayerMovement("East");
    if(keys.s.pressed)
      HandlePlayerMovement("South");
    if(keys.a.pressed)
      HandlePlayerMovement("West");
  }
  if(Game.state !== "normal") return;
  /// PICKUP ITEMS
  Timers.pickupTimer.add();
  if(!Game.inventoryObj) {
    for(let obj of Lists.itemsObjs)
      if(obj.level === Game.player.level && IsInView(obj) && obj.location === "floor" && CollisionDetection(Game.player, obj)) {
        if(keys.p.pressed && Timers.pickupTimer.check()) {
          Game.player.pickup(obj);
          break;
        }
      }
  }
  for(let obj of Lists.interactableObjs) {
    if(obj.level === Game.player.level && IsInView(obj) && CollisionDetectionRange(Game.player, obj, Game.interactionRange)) {
      if(keys.e.pressed && Timers.pickupTimer.check()) {
          Game.player.interact(obj);
          break;
      }
    }
  }
}

  