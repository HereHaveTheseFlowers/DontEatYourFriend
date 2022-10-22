import { Game, Tiles, Lists, Timer } from './globals.js';
import { CreateImage, IsInView } from './functions.js';


export default class Sprite {
    constructor({name, position, image, frames = { max: 1 }, sprites, location = "none", solid = false, interactable = false, item = false, size = 1, animationFrameRate = 20, upperImage = false, folder = false, level, upperImageOffset = Tiles(1), interactCooldown = 300}) {
        this.spriteID = Math.floor(Math.random() * (100000 - 1) + 1);
        this.name = name;
        this.position = position;
        this.level = level;
        this.folder = folder;
        if(typeof image === 'string') {
            this.image = CreateImage(image, folder);
        }
        else {
            this.image = image;
        }
        this.upperImage = upperImage
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.animationFrameRate = animationFrameRate
        this.sprites = sprites
        this.location = location;
        this.moving = true;
        switch(location) {
            case 'floor':
                Lists.floorObjs.push(this);
                break;
            case 'bg':
                Lists.bgObjs.push(this);
                break;
            case 'player':
                Lists.playerObjs.push(this);
                this.moving = true;
                break;
            case 'inventory':
                Lists.inventoryObjs.push(this);
                break;
            case 'debug':
                Lists.debugObjs.push(this);
                break;
			case 'upper':
				Lists.upperObjs.push(this);
				break;
        }
        if(solid)
            Lists.solidObjs.push(this);
        this.interactable = interactable
        if(interactable)
            Lists.interactableObjs.push(this);
        this.item = item
        if(item)
            Lists.itemsObjs.push(this);
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            this.postLoad();
        }
		if(this.upperImage) {
			const upperImageNew = CreateImage(this.upperImage, this.folder);
			const newSprite = new Sprite({
				name: this.name + "_upper",
				position: {
					x: this.position.x,
					y: this.position.y - upperImageOffset
				},
				image: upperImageNew,
				location: "upper",
				solid: false,
                level: this.level
			});
		}
        this.size = size;
        this.interactCooldown = interactCooldown;
        this.lastInteractDate = new Date().getTime();
    }
    draw() {
        if(!IsInView(this))
            return;
        Game.c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max / this.size,
            this.image.height / this.size
        );
        if(!this.moving) {
            this.frames.val = 0
            return;
        }
        if(this.frames.max > 1) this.frames.elapsed++;
        if(this.frames.elapsed % this.animationFrameRate === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0
        }
    }
    _interact() {
        if(new Date().getTime() - this.lastInteractDate > this.interactCooldown) {
            this.lastInteractDate = new Date().getTime();
            this.interact();
        }
    }
    interact = function () {
        console.log('cant interact with that');
        return false;
    }
    moveLocation = function (newLoc) {
        switch(this.location) {
            case 'floor':
                Lists.floorObjs = Lists.floorObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'inventory':
                Lists.inventoryObjs = Lists.inventoryObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'bg':
                Lists.bgObjs = Lists.bgObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'debug':
                Lists.debugObjs = Lists.debugObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'player':
                Lists.playerObjs = Lists.playerObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'upper':
                Lists.upperObjs = Lists.upperObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
        }
        switch(newLoc) {
            case 'floor':
                Lists.floorObjs.push(this);
                break;
            case 'inventory':
                Lists.inventoryObjs.push(this);
                break;
            case 'bg':
                Lists.bgObjs.push(this);
                break;
            case 'player':
                Lists.playerObjs.push(this);
                break;
            case 'debug':
                Lists.debugObjs.push(this);
                break;
            case 'upper':
                Lists.upperObjs.push(this);
                break;
        }
        this.location = newLoc;
    }
    postLoad = function () {
        return;
    }
    teleport(offsetx, offsety) {
        for(let obj of Lists.floorObjs)
            if(obj.spriteID !== this.spriteID && obj.level === Game.player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of Lists.upperObjs)
            if(obj.spriteID !== this.spriteID && obj.level === Game.player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of Lists.bgObjs)
            if(obj.spriteID !== this.spriteID && obj.level === Game.player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of Lists.debugObjs)
            if(obj.spriteID !== this.spriteID && obj.level === Game.player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
    }
    shake(offset = 5, milliseconds = 360) {
        let currentOffset = 0;
        let currentDir = 'right';
        const initialPosition = {
            x: this.position.x,
            y: this.position.y
        }
        let shakeEnd = false;
        const that = this;
        const intervalVal = 26;
        const shakeTimer = new Timer(milliseconds/intervalVal);
        const shakeFunc = () => {
            if(currentDir === 'right') {
                currentOffset += 4;
                that.position =  {
                    x: initialPosition.x + currentOffset,
                    y: initialPosition.y
                };
                if(currentOffset > offset) {
                    currentDir = 'left';
                    // offset -= 1;
                }
            } else {
                currentOffset -= 4;
                that.position =  {
                    x: initialPosition.x + currentOffset,
                    y: initialPosition.y
                };
                if(currentOffset < offset * -1) {
                    currentDir = 'right';
                    // offset -= 1;
                }
            }
            if(shakeTimer.check()) { 
                shakeEnd = true;
            }
            if(shakeEnd && currentOffset === 0) {
                clearInterval(shakeInterval);
                that.position = initialPosition;
            }
        }
        const shakeInterval = setInterval(shakeFunc, intervalVal);
    }
}

export class LivingSprite extends Sprite {
    constructor(obj) {
        super(obj)
    }
    speak(text, shake = true) {
        Game.chat.setText(`${this.name}: \"${text}\"`);
        if(shake) this.shake();
        if(this.spriteID === store.getState().player.spriteID) {
            Game.dialogueCloud = true;
            setTimeout(function() {
                Game.dialogueCloud = false;
            }, 1000)
        }
    }
    pickup = function () {
        return false;
    }
}