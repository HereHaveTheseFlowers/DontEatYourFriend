
export function Tiles(numberOfTiles) {
    return numberOfTiles * Game.tileSize
}
export function Pixels(numberOfPixels) {
  return numberOfPixels * 6
}
export const Game = {
    mainCanvas: document.querySelector('canvas'),
    transitionDiv: document.getElementById('transition'),
    menuDiv: document.getElementById('loading'),
    menuLogo: document.getElementById('loadingcontent'),
    menuButtonStart: document.getElementById('start'),

    c: false,
    chat: false,
    state: "transition",
    debug: false,
    speed: 1,
    playerMovementSpeed: 2,
    active_dialogue: false,
    interactionRange: 8,
    exportRatio: 600,
    movingSpeed: 6,
    tileSize: 16 * (600 / 100),
    bgOffset: 0,
    player: false,
    inventoryObj: false,
    iconPickup: false,
    iconInteract: false,
    iconDialogue: false
};

export const Lists = {
    floorObjs: [],
    bgObjs: [],
    playerObjs: [],
    inventoryObjs: [],
    debugObjs: [],
    upperObjs: [],
    solidObjs: [],
    interactableObjs: [],
    itemsObjs: []
}

export class Timer {
    constructor(limit = 0) {
      this.limit = limit;
      this.val = 0;
    }
    check(limit) {
      const newlimit = limit ? limit : this.limit;
      if(this.val >= newlimit) {
        this.val = 0;
        return true;
      }
      else {
        this.add();
      }
    }
    add() {
      this.val = this.val + 1;
    }
    reset() {
      this.val = 0;
    }
}

export const Timers = {
    canvasDrawDelayTimer: new Timer(Game.speed), // 1
    movementDelayTimer: new Timer(Game.playerMovementSpeed), // 2
    performanceCheckTimer: new Timer(60),
    dialogueProceedTimer: new Timer(100),
    pickupTimer: new Timer(60)
}
