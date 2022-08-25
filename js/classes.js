
class Sprite {
    constructor({name, position, image, frames = { max: 1 }, sprites, location = "none", solid = false, interactable = false, item = false, size = 1, animationFrameRate = 20, upperImage = false, folder = false, level, upperImageOffset = Tiles(1)}) {
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
                floorObjs.push(this);
                break;
            case 'bg':
                bgObjs.push(this);
                break;
            case 'player':
                playerObjs.push(this);
                this.moving = true;
                break;
            case 'inventory':
                inventoryObjs.push(this);
                break;
            case 'debug':
                debugObjs.push(this);
                break;
			case 'upper':
				upperObjs.push(this);
				break;
        }
        if(solid)
            solidObjs.push(this);
        this.interactable = interactable
        if(interactable)
            interactableObjs.push(this);
        this.item = item
        if(item)
            itemsObjs.push(this);
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            this.postLoad();
        }
		if(this.upperImage) {
			const upperImageNew = CreateImage(this.upperImage, this.folder);
			new Sprite({
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
    }
    draw() {
        if(!IsInView(this))
            return;
        c.drawImage(
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
    pickup = function () {
        console.log('not a player');
        return false;
    }
    interact= function () {
        console.log('not a player');
        return false;
    }
    moveLocation = function (newLoc) {
        switch(this.location) {
            case 'floor':
                floorObjs = floorObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'inventory':
                inventoryObjs = inventoryObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'bg':
                bgObjs = bgObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'debug':
                debugObjs = debugObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'player':
                playerObjs = playerObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'upper':
                upperObjs = upperObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
        }
        switch(newLoc) {
            case 'floor':
                floorObjs.push(this);
                break;
            case 'inventory':
                inventoryObjs.push(this);
                break;
            case 'bg':
                bgObjs.push(this);
                break;
            case 'player':
                playerObjs.push(this);
                break;
            case 'debug':
                debugObjs.push(this);
                break;
            case 'upper':
                upperObjs.push(this);
                break;
        }
        this.location = newLoc;
    }
    postLoad = function () {
        return;
    }
    teleport(offsetx, offsety) {
        for(let obj of floorObjs)
            if(obj.spriteID !== this.spriteID && obj.level === player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of upperObjs)
            if(obj.spriteID !== this.spriteID && obj.level === player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of bgObjs)
            if(obj.spriteID !== this.spriteID && obj.level === player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
        for(let obj of debugObjs)
            if(obj.spriteID !== this.spriteID && obj.level === player.level) {
                obj.position.y -= offsety;
                obj.position.x -= offsetx;
            }
    }
}

class Level {
    constructor({name, active}) {
        this.name = name
        this.active = active
    }
    switch() {
        for(let level of levels)
            level.active = false;
        this.active = true;
        player.level = this.name
    }
    draw() {
        const level = this.name
        /// DRAWING BG
        for(let obj of bgObjs)
            if(obj.level === level) obj.draw();
        /// DRAWING BG sctructures (non-items)
        for(let obj of floorObjs)
            if(!obj.item && obj.level === level) obj.draw();
        /// DRAWING ITEMS
        c.save();
        MakeShadow(6, -3, 12, 'rgba(0,20,0,0.20)');
        for(let obj of floorObjs)
            if(obj.item  && obj.level === level) obj.draw();
        /// DRAWING PLAYER
        for(let obj of inventoryObjs)
            if(player.image === player.sprites.up) {
                obj.position = {
                    x: player.position.x + Tiles(1) / 6,
                    y: player.position.y + 20
                }
                obj.draw();
            }
        for(let obj of playerObjs)
            obj.draw();
        
        for(let obj of inventoryObjs) {
            if(player.image === player.sprites.left) {
                obj.position = {
                    x: player.position.x + Tiles(1) / 6 - 20,
                    y: player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
            else if(player.image === player.sprites.right) {
                obj.position = {
                    x: player.position.x + Tiles(1) / 6 + 20,
                    y: player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
            else if(player.image === player.sprites.down) {
                obj.position = {
                    x: player.position.x + Tiles(1) / 6,
                    y: player.position.y + Tiles(1) / 3 + 8
                }
                obj.draw();
            }
        }
        c.restore();
        for(let obj of upperObjs)
            if(obj.level === level) obj.draw();
        /// INTERACT W/ OBJECTS
        for(let obj of interactableObjs) {
            if(Game.state !== "normal") return;
            if(obj.level === level && IsInView(obj) && CollisionDetectionRange(player, obj, GLOB_interactionRange)) {
                c.globalAlpha = 0.8;
                iconInteract.position = {
                    x: player.position.x,
                    y: player.position.y - 75
                }
                iconInteract.draw();
                c.globalAlpha = 1;
                break;
            }
        }
        if(!inventoryObj) {
            if(Game.state !== "normal") return;
            for(let obj of itemsObjs)
                if(obj.level === level && IsInView(obj) && obj.location === "floor" && CollisionDetection(player, obj)) {
                    c.globalAlpha = 0.8;
                    iconPickup.position = {
                        x: obj.position.x,
                        y: obj.position.y - 75
                    }
                    iconPickup.draw();
                    c.globalAlpha = 1;
                    break;
                }
        }
        else {
        /// PUT DOWN ITEMS
            if(keys.p.pressed && pickupTimer > pickupTimerCap && Game.state === "normal") {
                player.pickup(inventoryObj);
                pickupTimer = 0;
            }
        }
        if(Game.debug)
            for(let obj of debugObjs)
                if(obj.level === level) obj.draw();
    }
}
