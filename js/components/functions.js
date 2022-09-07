import { Game, Tiles, Lists } from './globals.js';
import Sprite from './sprite.js';


function MakeShadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
  Game.c.shadowOffsetX = shadowOffsetX;
  Game.c.shadowOffsetY = shadowOffsetY;
  Game.c.shadowBlur = shadowBlur;
  Game.c.shadowColor = shadowColor;
}

function CreateImage(imagename, folder = false, custom_path = false) {
  const output = new Image();
  if(custom_path)
    output.src = imagename;
  else {
    if(folder) {
      folder = folder + '/';
      output.src = './img/' + folder + imagename + '-' + Game.exportRatio + '.png';
    }
    else
      output.src = './img/' + imagename + '-' + Game.exportRatio + '.png';
  }
  return output;
}

/// OBJ COLLISION

function CollisionDetection (objOne, objTwo, dir = "none") {
    //    west: (objOne.position.x < objTwo.position.x +  objTwo.width),
    //    east:(objOne.position.x + objOne.width > objTwo.position.x),
    //    north: (objOne.position.y < objTwo.position.y +  objTwo.height),
    //    south: (objOne.position.y +  objOne.height > objTwo.position.y),
    //    overall: false

    // output: (objOne.position.x < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width > objTwo.position.x) && (objOne.position.y < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height > objTwo.position.y)
  if(objTwo.level !== objOne.level) return false;
  switch(dir) {
      case 'North':
        if(Game.debug) {
          Game.c.fillStyle = 'yellow'
          Game.c.globalAlpha = 0.01;
          Game.c.fillRect(objOne.position.x + 30, objOne.position.y + 60 - Game.movingSpeed, objOne.width - 60, objOne.height - 60  + Game.movingSpeed)
          Game.c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 - Game.movingSpeed <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y + objOne.height >= objTwo.position.y);
      case 'East':
        if(Game.debug) {
          Game.c.fillStyle = 'yellow'
          Game.c.globalAlpha = 0.01;
          Game.c.fillRect(objOne.position.x + 30, objOne.position.y + 60, objOne.width - 60 + Game.movingSpeed, objOne.height - 60)
          Game.c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 + Game.movingSpeed >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height >= objTwo.position.y);
      case 'South':
        if(Game.debug) {
          Game.c.fillStyle = 'yellow'
          Game.c.globalAlpha = 0.01;
          Game.c.fillRect(objOne.position.x + 30, objOne.position.y + 60, objOne.width - 60, objOne.height - 60 + Game.movingSpeed)
          Game.c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height + Game.movingSpeed >= objTwo.position.y);
      case 'West':
        if(Game.debug) {
          Game.c.fillStyle = 'yellow'
          Game.c.globalAlpha = 0.01;
          Game.c.fillRect(objOne.position.x + 30 - Game.movingSpeed, objOne.position.y + 60, objOne.width - 60 + Game.movingSpeed, objOne.height - 60)
          Game.c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 - Game.movingSpeed <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height >= objTwo.position.y);
      default:
        if(Game.debug) {
          Game.c.fillStyle = 'red'
          Game.c.globalAlpha = 0.01;
          Game.c.fillRect(objOne.position.x, objOne.position.y, objOne.width, objOne.height)
          Game.c.globalAlpha = 1;
        }
        return  (objOne.position.x < objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width > objTwo.position.x) && 
                (objOne.position.y < objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height > objTwo.position.y);
  }
}

function CollisionDetectionRange(objOne, objTwo, range) {
  if(Game.debug) {
    Game.c.fillStyle = 'blue'
    Game.c.globalAlpha = 0.1;
    Game.c.fillRect(objOne.position.x - range , objOne.position.y - range , objOne.width + range*2, objOne.height + range*2)
    Game.c.globalAlpha = 1;
  }
  return  (objOne.position.x - range < objTwo.position.x +  objTwo.width) && 
          (objOne.position.x +  objOne.width + range > objTwo.position.x) && 
          (objOne.position.y - range < objTwo.position.y +  objTwo.height) && 
          (objOne.position.y +  objOne.height + range > objTwo.position.y);
}

//// Handle player movement

function HandlePlayerMovement(dir) {
  let canmove = true;
  let bg = false;
  for(let obj of Lists.bgObjs)
    if(obj.level === Game.player.level)
      bg = obj;
  Game.player.moving = true;
  switch(dir) {
    case 'North':
      Game.player.image = Game.player.sprites.up;
      for(let obj of Lists.solidObjs)
        if(obj.level === Game.player.level && IsInView(obj) && CollisionDetection(Game.player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(Game.player.position.y <= bg.position.y + Tiles(3) || Game.player.position.y > Tiles(3)) {
        for(let obj of Lists.playerObjs)
          obj.position.y -= Game.movingSpeed;
        break;
      }
      for(let obj of Lists.floorObjs)
        if(obj.level === Game.player.level) obj.position.y += Game.movingSpeed;
      for(let obj of Lists.upperObjs)
        if(obj.level === Game.player.level) obj.position.y += Game.movingSpeed;
      for(let obj of Lists.bgObjs)
        if(obj.level === Game.player.level) obj.position.y += Game.movingSpeed;
      for(let obj of Lists.debugObjs)
        if(obj.level === Game.player.level) obj.position.y += Game.movingSpeed;
      break;
    case 'East':
      Game.player.image = Game.player.sprites.right;
      for(let obj of Lists.solidObjs)
        if(obj.level === Game.player.level && IsInView(obj) && CollisionDetection(Game.player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(Game.player.position.x >= bg.width  + bg.position.x - Tiles(6) ||  Game.player.position.x < Tiles(5)) {
        for(let obj of Lists.playerObjs)
          obj.position.x += Game.movingSpeed;
        break;
      }
      for(let obj of Lists.floorObjs)
        if(obj.level === Game.player.level) obj.position.x -= Game.movingSpeed;
      for(let obj of Lists.upperObjs)
        if(obj.level === Game.player.level) obj.position.x -= Game.movingSpeed;
      for(let obj of Lists.bgObjs)
        if(obj.level === Game.player.level) obj.position.x -= Game.movingSpeed;
      for(let obj of Lists.debugObjs)
        if(obj.level === Game.player.level) obj.position.x -= Game.movingSpeed;
      break;
    case 'South':
      Game.player.image = Game.player.sprites.down;
      for(let obj of Lists.solidObjs)
        if(obj.level === Game.player.level && IsInView(obj) && CollisionDetection(Game.player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(Game.player.position.y >= bg.position.y + bg.height - Tiles(4) || Game.player.position.y < Tiles(3)) {
        for(let obj of Lists.playerObjs)
          obj.position.y += Game.movingSpeed;
        break;
      }
      for(let obj of Lists.floorObjs)
        if(obj.level === Game.player.level) obj.position.y -= Game.movingSpeed;
      for(let obj of Lists.upperObjs)
        if(obj.level === Game.player.level) obj.position.y -= Game.movingSpeed;
      for(let obj of Lists.bgObjs)
        if(obj.level === Game.player.level) obj.position.y -= Game.movingSpeed;
      for(let obj of Lists.debugObjs)
        if(obj.level === Game.player.level) obj.position.y -= Game.movingSpeed;
      break;
    case 'West':
      Game.player.image = Game.player.sprites.left;
      for(let obj of Lists.solidObjs)
        if(obj.level === Game.player.level && IsInView(obj) && CollisionDetection(Game.player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(Game.player.position.x <= bg.position.x + Tiles(5) ||  Game.player.position.x > Tiles(5)) {
        for(let obj of Lists.playerObjs)
          obj.position.x -= Game.movingSpeed;
        break;
      }
      for(let obj of Lists.floorObjs)
        if(obj.level === Game.player.level) obj.position.x += Game.movingSpeed;
      for(let obj of Lists.upperObjs)
        if(obj.level === Game.player.level) obj.position.x += Game.movingSpeed;
      for(let obj of Lists.bgObjs)
        if(obj.level === Game.player.level) obj.position.x += Game.movingSpeed;
      for(let obj of Lists.debugObjs)
        if(obj.level === Game.player.level) obj.position.x += Game.movingSpeed;
      break;
  }
}


function PickRand(...array) {
  for(let item of array) {
    if(Array.isArray(item))
      return item[Math.floor(Math.random()*item.length)];
    else
      return array[Math.floor(Math.random()*array.length)];
  }
}

function PopulateAreaWith(areaX, areaY, areaWidth, areaHeight, popwith = {leafs: 0, rocks: 0, mushrooms: 0}, level = "") {
  let locArray = [];
  for(let i = areaX; i < areaX + areaWidth;) {
    for(let j = areaY; j < areaY + areaHeight;) {
      locArray.push([i, j]);
      j += Tiles(1);
    }
    i += Tiles(1);
  }
  for(let i = 0; i < popwith.leafs; i++) {
    //name
    const objNumber = PickRand(1, 2, 3);
    //location
    const locIndex = Math.floor(Math.random()*locArray.length);
    const loc = locArray[locIndex];
    //clearing locArray
    locArray.splice(locIndex, 1)
    // creating an obj
    const imageDroplet = CreateImage('leaf' + objNumber + 'Droplet', 'leafs');
    const newObj = new Sprite({
      name: "leaf",
      position: {
        x: Game.bgOffset.x + loc[0],
        y: Game.bgOffset.y + loc[1]
      },
      image: 'leaf' + objNumber,
      location: "floor",
      item: true,
      sprites: {
        default: 'leaf' + objNumber,
        droplet: imageDroplet
      },
      folder: 'leafs',
      level: level
    });
  }
  for(let i = 0; i < popwith.rocks; i++) {
    //name
    const objType = PickRand('Small', 'Medium', 'Large');
    const objNumber = PickRand(1, 2)
    //location
    let foundLoc = false;
    let foundLocTimer = 0;
    let locIndex = 0;
    let loc = 0;
    while (!foundLoc) {
      locIndex = Math.floor(Math.random()*locArray.length);
      loc = locArray[locIndex];
      if(objType === 'Small')
        foundLoc = true;
      if(objType === 'Medium')
        if(locArray.find(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]))
          foundLoc = true;
      if(objType === 'Large')
        if(locArray.find(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]) && locArray.find(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1]))
          foundLoc = true;
      if(foundLocTimer > locArray.length*5)
        foundLoc = 2; // failed to find a loc
      foundLocTimer++;
    }
    if(foundLoc === 2) break;

    // making sure no more obj will spawn nearby
    locArray.splice(locIndex, 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] - Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] + Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] - Tiles(1) && element[1] === loc[1]), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]), 1)
    if(objType === 'Medium' || objType === 'Large') {
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1] + Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1] - Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1]), 1)
    }
    if(objType === 'Large') {
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(3) && element[1] === loc[1]), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1] + Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1] - Tiles(1)), 1)
    }

    // creating the obj
    const newObj = new Sprite({
      name: "rocks",
      position: {
          x: Game.bgOffset.x + loc[0],
          y: Game.bgOffset.y + loc[1]
      },
      image: 'rocks' + objType + objNumber,
      location: "floor",
      solid: true,
      upperImage: objType === 'Small' ? false : ('rocks' + objType + objNumber + 'upper'),
      folder: 'rocks',
      level: level
    });
  }
  for(let i = 0; i < popwith.mushrooms; i++) {
    //name
    const objType = PickRand('Small', 'Medium', 'Large');
    const objColor = PickRand('Red', 'Brown');
    const objNumber = objColor === 'Brown' ? '1' : (PickRand(1, 2, 3));
    //location
    const locIndex = Math.floor(Math.random()*locArray.length);
    const loc = locArray[locIndex];
    //clearing locArray
    locArray.splice(locIndex, 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] - Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] + Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] - Tiles(1) && element[1] === loc[1]), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]), 1)
    // creating an obj
    const newObj = new Sprite({
      name: "mushroom",
      position: {
          x: Game.bgOffset.x + loc[0],
          y: Game.bgOffset.y + loc[1]
      },
      image: 'mushroom' + objColor + objType + objNumber,
      location: "floor",
      solid: objType === 'Small' ? false : true,
      upperImage: objType === 'Large' ? ('mushroom' + objColor +  objType + objNumber + 'upper') : false,
      folder: 'mushrooms',
      item: objType === 'Small' ? true : false,
      level: level
    });
  }
}

function IsInView(obj) {
  return !(obj.position.x + obj.width < 0 || obj.position.y + obj.height < 0 || obj.position.x > Tiles(11) || obj.position.y >= Tiles(7))
}

/*
CREATE BORDERS FUNC
Lets you generate invisible borders around given obj
parameters:
array - represents the area around obj
example:
[[1, 0, 0, 0, 1],
[1, 0, 0, 0, 1],
[1, 1, 2, 1, 1]]
obj - the obj that we are going to generate borders around
*/
function CreateBorders(array, obj) {
  let mainObjLoc = [0, 0]; // row and column position of the main obj
  for(let row in array)
    for(let elem in array[row]) {
      if(array[row][elem] === 2 || array[row][elem] === 3) {
        mainObjLoc = [Number(elem), Number(row)];
        break;
      }
    }
  for(let row in array) {
    for(let elem in array[row]) {
      if(array[row][elem] === 1 || array[row][elem] === 3) {
        const border1 = new Sprite({
          name: "border",
          position: {
              x: obj.position.x + Tiles((elem - mainObjLoc[0])),
              y: obj.position.y + Tiles((row - mainObjLoc[1]))
          },
          image: 'border',
          location: "debug",
          solid: true,
          level: obj.level
        });
      }
    }
  }
}

export { MakeShadow, CreateImage, CollisionDetection, CollisionDetectionRange, HandlePlayerMovement, PickRand, PopulateAreaWith, IsInView, CreateBorders };