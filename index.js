
mainCanvas.style.display = 'none';
const el = document.querySelector('.text');
const chat = new TextFlow(el);
mainCanvas.width = 1056;
mainCanvas.height = 672; 
const c = mainCanvas.getContext('2d');

/// IMAGE UPLOAD

// bg
const imageBG = CreateImage('bg2');


// floor
const imagePool = CreateImage('pool');
const imageHome = CreateImage('home');
const imageDoor = CreateImage('door');


//items
const imageSeed = CreateImage('seed');

//player
const playerDownImage = CreateImage('playerDown');
const playerUpImage = CreateImage('playerUp');
const playerLeftImage = CreateImage('playerLeft');
const playerRightImage = CreateImage('playerRight');
//none
const imageIconInteract = CreateImage('IconInteract');
const imageIconPickup = CreateImage('IconPickup');

// debug
const imageGrid = CreateImage('grid');
const imageBorder = CreateImage('border');

////////////////////////
//// PLAYER AND ICONS //
////////////////////////
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
  animationFrameRate: 7,
});
let inventoryObj = false;

player.pickup = function(obj) {
  if(!obj.item || !CollisionDetection(player, obj))
    return false;
  if(inventoryObj) {
    obj.position = {
      x: player.position.x,
      y: player.position.y
    }
    obj.size = 1;
    obj.moveLocation("floor");
    chat.setText("You placed a " + obj.name + ' on the ground.')
    inventoryObj = false;
  }
  else {
    inventoryObj = obj;
    obj.size = 1.5;
    obj.moveLocation("inventory");
    chat.setText("You picked up a " + obj.name + '.')
  }
}

player.interact = function(obj) {
  if(!obj || !CollisionDetectionRange(player, obj, GLOB_interactionRange))
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
////////////////////////
//// BG AND DEBUG   ////
////////////////////////

const background = new Sprite({
  name: "background",
  position: {
      x: GLOB_bgOffset.x,
      y: GLOB_bgOffset.y
  },
  image: imageBG,
  location: "bg"
});

background.postLoad = function() {
  if(this.name === "background") {
    for(let i = 0; i < background.width / GLOB_tileSize; i++) {
      const imageBorderCycles = CreateImage('border');
      const imageBorderCycles2 = CreateImage('border');
      const imageBorderCycles3 = CreateImage('border');
      const imageBorderCycles4 = CreateImage('border');
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + Tiles(i),
              y: GLOB_bgOffset.y
          },
          image: imageBorderCycles,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + Tiles(i),
              y: GLOB_bgOffset.y + background.height - 40
          },
          image: imageBorderCycles2,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x,
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles3,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + background.width - Tiles(1),
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles4,
          location: "debug",
          solid: true
      });
    }
  }
}

const grid = new Sprite({
  name: "grid",
  position: {
      x: GLOB_bgOffset.x,
      y: GLOB_bgOffset.y
  },
  image: imageGrid,
  location: "debug"
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
      x: GLOB_bgOffset.x + Tiles(14),
      y: GLOB_bgOffset.y + Tiles(1)
  },
  image: imagePool,
  frames: { max: 2 },
  animationFrameRate: 150,
  location: "floor",
  solid: true,
  interactable: true
});

pool.interact = function(obj) {
  if(inventoryObj.name === "leaf") {
    if(inventoryObj.name === "leaf with a droplet of water")
      chat.setText('You already have a droplet on your leaf!');
    else {
      chat.setText('You fill the leaf with a droplet of water.');
      inventoryObj.image = inventoryObj.sprites.droplet;
      inventoryObj.name = "leaf with a droplet of water";
    }
  }
  else
    chat.setText('You can fill something with water.');
}

const home = new Sprite({
  name: "home",
  position: {
      x: GLOB_bgOffset.x + Tiles(3),
      y: GLOB_bgOffset.y + Tiles(0)
  },
  image: imageHome,
  location: "floor",
  solid: false
});

// home borders
home.postLoad = function() {
  const door = new Sprite({
    name: "door",
    position: {
        x: this.position.x +  Tiles(5),
        y: this.position.y +  Tiles(2)
    },
    image: imageDoor,
    location: "floor",
    solid: true,
    interactable: true
  });
  const imageBorder1 = CreateImage('border');
  const imageBorder2 = CreateImage('border');
  const imageBorder3 = CreateImage('border');
  const imageBorder4 = CreateImage('border');
  const imageBorder5 = CreateImage('border');
  const imageBorder6 = CreateImage('border');
  const imageBorder7 = CreateImage('border');
  const imageBorder8 = CreateImage('border');
  const imageBorder9 = CreateImage('border');
  const border1 = new Sprite({
      name: "border",
      position: {
          x: this.position.x + Tiles(3),
          y: this.position.y
      },
      image: imageBorder1,
      location: "debug",
      solid: true
  });
  const border2 = new Sprite({
      name: "border",
      position: {
          x: this.position.x + Tiles(3),
          y: this.position.y + Tiles(1)
      },
      image: imageBorder2,
      location: "debug",
      solid: true
  });
  const border3 = new Sprite({
      name: "border",
      position: {
          x: this.position.x + Tiles(3),
          y: this.position.y + Tiles(2)
      },
      image: imageBorder3,
      location: "debug",
      solid: true
  });
  const border4 = new Sprite({
      name: "border",
      position: {
        x: this.position.x + Tiles(4),
        y: this.position.y + Tiles(2)
      },
      image: imageBorder4,
      location: "debug",
      solid: true
  });
  const border5 = new Sprite({
      name: "border",
      position: {
        x: this.position.x + Tiles(5),
        y: this.position.y + Tiles(2)
      },
      image: imageBorder5,
      location: "debug",
      solid: true
  });
  const border6 = new Sprite({
    name: "border",
    position: {
      x: this.position.x + Tiles(6),
      y: this.position.y + Tiles(2)
    },
    image: imageBorder6,
    location: "debug",
    solid: true
  });
  const border7 = new Sprite({
    name: "border",
    position: {
      x: this.position.x + Tiles(7),
      y: this.position.y + Tiles(2)
    },
    image: imageBorder7,
    location: "debug",
    solid: true
  });
  const border8 = new Sprite({
    name: "border",
    position: {
      x: this.position.x + Tiles(7),
      y: this.position.y + Tiles(1)
    },
    image: imageBorder8,
    location: "debug",
    solid: true
  });
  const border9 = new Sprite({
    name: "border",
    position: {
      x: this.position.x + Tiles(7),
      y: this.position.y + Tiles(0)
    },
    image: imageBorder9,
    location: "debug",
    solid: true
  });
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
      x: GLOB_bgOffset.x + Tiles(12),
      y: GLOB_bgOffset.y + Tiles(7)
  },
  image: imageSeed,
  solid: false,
  item: true,
  location: "floor"
});

PopulateAreaWith(Tiles(1), Tiles(5), Tiles(18), Tiles(15), leafs = 9, rocks = 6, mushrooms = 15)
