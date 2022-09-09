import TextFlow from './components/textgen.js';
import { Game, Tiles, Lists, Timers } from './components/globals.js';
Game.tileSize = 16 * (Game.exportRatio / 100)
Game.bgOffset = { x:  - Tiles(1), y: - Tiles(4) }
Game.mainCanvas.style.display = 'none';
Game.mainCanvas.width = 1056;
Game.mainCanvas.height = 672; 
Game.c = Game.mainCanvas.getContext('2d');
Game.chat = new TextFlow(document.querySelector('.text'));
import { prepareGameStart, GameStart } from './components/loading.js';
import { keys, prepareKeys } from './components/keys.js';
import Sprite from './components/sprite.js';
import { Level, levels, level_Day1, level_Home } from './components/level.js';
import Dialogue from './components/dialogue.js';
import { MakeShadow, CreateImage, CollisionDetection, CollisionDetectionRange, HandlePlayerMovement, PickRand, PopulateAreaWith, IsInView, CreateBorders } from './components/functions.js';

prepareKeys();
prepareGameStart();



/// IMAGE UPLOAD

// bg
const imageBG = CreateImage('bg');
const imageBG_home = CreateImage('bg', 'home');

// floor
const imagePool = CreateImage('pool');
const imageTreeHome = CreateImage('home');

//none
const imageIconInteract = CreateImage('IconInteract');
const imageIconPickup = CreateImage('IconPickup');

// debug
const imageGrid = CreateImage('grid');
const imageBorder = CreateImage('border');

////////////////////////
//// PLAYER AND ICONS //
////////////////////////
const playerDownImage = CreateImage('playerDown', 'player');
const playerUpImage = CreateImage('playerUp', 'player');
const playerLeftImage = CreateImage('playerLeft', 'player');
const playerRightImage = CreateImage('playerRight', 'player');
const player = new Sprite({
  name: "player",
  position: {
    x: Tiles(5),
    y: Tiles(3)
    //x: mainCanvas.width / 2 - GLOB_playerSpriteWidth / 4 / 2, //SEARCHING FOR CENTER MANUALLY
    //y: mainCanvas.height / 2 -  GLOB_playerSpriteHeight / 2
  },
  image: playerDownImage,
  frames: { max: 4 },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    right: playerRightImage,
    left: playerLeftImage
  },
  location: "player",
  level: "home",
  animationFrameRate: 7,
});
Game.player = player


player.pickup = function(obj) {
  if(!obj.item)
    return false;
  if(Game.inventoryObj) {
    obj.position = {
      x: player.position.x,
      y: player.position.y
    }
    obj.size = 1;
    obj.moveLocation("floor");
    obj.level = player.level
    Game.chat.setText("You placed a " + obj.name + ' on the ground.')
    Game.inventoryObj = false;
  }
  else {
    Game.inventoryObj = obj;
    obj.size = 1.5;
    obj.moveLocation("inventory");
    Game.chat.setText("You picked up a " + obj.name + '.')
  }
}

player.interact = function(obj) {
  if(!obj || !CollisionDetectionRange(player, obj, Game.interactionRange))
    return false;
  obj.interact(player)
}

const iconInteract = new Sprite({
  name: "IconInteract",
  frames: { max: 6 },
  position: {
    x: Tiles(5),
    y: Tiles(2)
  },
  animationFrameRate: 50,
  image: imageIconInteract
});

const iconPickup= new Sprite({
  name: "iconPickup",
  frames: { max: 6 },
  position: {
    x: 0,
    y: 0
  },
  animationFrameRate: 50,
  image: imageIconPickup
});

const iconDialogue= new Sprite({
  name: "iconDialogue",
  position: {
    x: Tiles(5),
    y: Tiles(2)
  },
  image: "dialoguecloud"
});
Game.iconDialogue = iconDialogue;
Game.iconInteract = iconInteract;
Game.iconPickup = iconPickup;

////////////////////////
//// BG AND DEBUG   ////
////////////////////////
const background = new Sprite({
  name: "background",
  position: {
      x: Game.bgOffset.x,
      y: Game.bgOffset.y
  },
  image: "bg",
  location: "bg",
  level: "day1"
});

background.postLoad = function() {
  if(this.name === "background") {
    for(let i = 0; i < background.width / Game.tileSize; i++) {
      const imageBorderCycles = CreateImage('border');
      const imageBorderCycles2 = CreateImage('border');
      const imageBorderCycles3 = CreateImage('border');
      const imageBorderCycles4 = CreateImage('border');
      new Sprite({
          name: "border",
          position: {
              x: Game.bgOffset.x + Tiles(i),
              y: Game.bgOffset.y
          },
          image: imageBorderCycles,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: Game.bgOffset.x + Tiles(i),
              y: Game.bgOffset.y + background.height - 40
          },
          image: imageBorderCycles2,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: Game.bgOffset.x,
              y: Game.bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles3,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: Game.bgOffset.x + background.width - Tiles(1),
              y: Game.bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles4,
          location: "debug",
          solid: true,
          level: this.level
      });
    }
  }
}

const grid = new Sprite({
  name: "grid",
  position: {
      x: Game.bgOffset.x,
      y: Game.bgOffset.y
  },
  image: imageGrid,
  location: "debug",
  level: "day1"
});

/* use this for creating invisible borders
const border = new Sprite({
  name: "border",
  position: {
      x: GLOB_bgOffset.x + Tiles(2),
      y: GLOB_bgOffset.y + Tiles(2)
  },
  image: imageBorder,
  location: "debug",
  solid: true
});
*/

////////////////////////
//// FLOOR NON-ITEMS////
////////////////////////



const pool = new Sprite({
  name: "pool",
  position: {
      x: Game.bgOffset.x + Tiles(14),
      y: Game.bgOffset.y + Tiles(1)
  },
  image: imagePool,
  frames: { max: 2 },
  animationFrameRate: 150,
  location: "floor",
  solid: true,
  interactable: true,
  level: "day1"
});

pool.interact = function(obj) {
  if(!Game.inventoryObj)
    Game.chat.setText('You can fill something with water.');
  else if(Game.inventoryObj.name === "leaf") {
      Game.chat.setText('You fill the leaf with a droplet of water.');
      Game.inventoryObj.image = Game.inventoryObj.sprites.droplet;
      Game.inventoryObj.name = "leaf with a droplet of water";
    }
  else if(Game.inventoryObj.name === "leaf with a droplet of water")
    Game.chat.setText('You already have a droplet on your leaf!');
  else
    Game.chat.setText('You cant fill that with water.');
}


/* Example on how to generate multiple objects automatically
for(let b = 0; b < 10; b++) {
  const image1 = CreateImage('rocks1');
  new Sprite({
    name: "rocks1",
    position: {
        x: GLOB_bgOffset.x + Tiles(b*3),
        y: GLOB_bgOffset.y + 1
    },
    image: image1,
    location: "floor",
    solid: true
  });
}
*/

////////////////////////
//// FLOOR ITEMS    ////
////////////////////////

const seed = new Sprite({
  name: "seed",
  position: {
      x: Game.bgOffset.x + Tiles(12),
      y: Game.bgOffset.y + Tiles(7)
  },
  image: "seed",
  solid: false,
  item: true,
  location: "floor",
  level: "day1"
});

PopulateAreaWith(Tiles(1), Tiles(6), Tiles(18), Tiles(13), {leafs: 9, rocks: 6, mushrooms: 15}, "day1")


/// day 1 

const treeHome = new Sprite({
  name: "treeHome",
  position: {
      x: Game.bgOffset.x + Tiles(3),
      y: Game.bgOffset.y + Tiles(0)
  },
  image: imageTreeHome,
  location: "floor",
  solid: false,
  level: "day1"
});

// home borders
treeHome.postLoad = function() {
  const door = new Sprite({
      name: "door",
      position: {
          x: this.position.x + Tiles(5),
          y: this.position.y + Tiles(2)
      },
      image: 'door',
      location: "floor",
      solid: true,
      interactable: true,
      level: "day1"
  });
  door.interact = function() {
      Game.state = "transition";
      transition.style.opacity = 1;
      setTimeout(() =>  {
          transition.style.opacity = 0;
          level_Home.switch();
          player.position = {
              x: Tiles(5),
              y: Tiles(4) + 20
          }
          player.teleport(Tiles(-2), Tiles(4))
          for(let obj of Lists.floorObjs)
              if(obj.level === this.level) {
                  obj.position.y -= Tiles(4);
                  obj.position.x -= Tiles(-2);
              }
          for(let obj of Lists.upperObjs)
              if(obj.level === this.level) {
                  obj.position.y -= Tiles(4);
                  obj.position.x -= Tiles(-2);
              }
          for(let obj of Lists.bgObjs)
              if(obj.level === this.level) {
                  obj.position.y -= Tiles(4);
                  obj.position.x -= Tiles(-2);
              }
          for(let obj of Lists.debugObjs)
              if(obj.level === this.level) {
                  obj.position.y -= Tiles(4);
                  obj.position.x -= Tiles(-2);
              }
          
          Game.chat.setText("You went inside your home.");
          setTimeout(() =>  {
              Game.state = "normal"
          }, 900);
      }, 900);
  }
  CreateBorders([
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 2, 1, 1]
                ], door);
}

// home

const background_home = new Sprite({
  name: "background_home",
  position: {
      x: Game.bgOffset.x,
      y: Game.bgOffset.y
  },
  image: "bg",
  folder: "home",
  location: "bg",
  level: "home",
  upperImage: "bgUpper",
  upperImageOffset: 0
});

// tree home borders
background_home.postLoad = function() {
  CreateBorders([
                [2, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 0]
                ], this);
}

const door_home = new Sprite({
  name: "door_home",
  position: {
      x: Game.bgOffset.x + Tiles(5) + 48,
      y: Game.bgOffset.y + Tiles(11) - 48
  },
  image: "door",
  location: "debug",
  level: "home",
  interactable: true
});

door_home.interact = function() {
  Game.state = "transition";
  transition.style.opacity = 1;
  setTimeout(() =>  {
      transition.style.opacity = 0;
      level_Day1.switch();
      player.position = {
          x: Tiles(5),
          y: Tiles(3)
      }
      player.teleport(Tiles(2), Tiles(-4))
      for(let obj of Lists.floorObjs)
          if(obj.level === this.level) {
              obj.position.y -= Tiles(-4);
              obj.position.x -= Tiles(2);
          }
      for(let obj of Lists.upperObjs)
          if(obj.level === this.level) {
              obj.position.y -= Tiles(-4);
              obj.position.x -= Tiles(2);
          }
      for(let obj of Lists.bgObjs)
          if(obj.level === this.level) {
              obj.position.y -= Tiles(-4);
              obj.position.x -= Tiles(2);
          }
      for(let obj of Lists.debugObjs)
          if(obj.level === this.level) {
              obj.position.y -= Tiles(-4);
              obj.position.x -= Tiles(2);
          }
      Game.chat.setText("You went outside of your home.")
      setTimeout(() =>  {
          Game.state = "normal"
      }, 900);
  }, 900);
}

const bed = new Sprite({
  name: "bed",
  position: {
      x: Game.bgOffset.x + Tiles(7),
      y: Game.bgOffset.y + Tiles(6)
  },
  image: "bed",
  folder: "home",
  location: "floor",
  interactable: true,
  solid: true,
  level: "home"
});

const dresser = new Sprite({
  name: "dresser",
  position: {
      x: Game.bgOffset.x + Tiles(4),
      y: Game.bgOffset.y + Tiles(6)
  },
  image: "dresser",
  folder: "home",
  location: "floor",
  interactable: true,
  solid: true,
  level: "home"
});

