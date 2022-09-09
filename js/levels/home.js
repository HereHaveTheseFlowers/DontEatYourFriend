
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
        x: GLOB_bgOffset.x + Tiles(5) + 48,
        y: GLOB_bgOffset.y + Tiles(11) - 48
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
        for(let obj of floorObjs)
            if(obj.level === this.level) {
                obj.position.y -= Tiles(-4);
                obj.position.x -= Tiles(2);
            }
        for(let obj of upperObjs)
            if(obj.level === this.level) {
                obj.position.y -= Tiles(-4);
                obj.position.x -= Tiles(2);
            }
        for(let obj of bgObjs)
            if(obj.level === this.level) {
                obj.position.y -= Tiles(-4);
                obj.position.x -= Tiles(2);
            }
        for(let obj of debugObjs)
            if(obj.level === this.level) {
                obj.position.y -= Tiles(-4);
                obj.position.x -= Tiles(2);
            }
        chat.setText("You went outside of your home.")
        setTimeout(() =>  {
            Game.state = "normal"
        }, 900);
    }, 900);
}

const bed = new Sprite({
    name: "bed",
    position: {
        x: GLOB_bgOffset.x + Tiles(7),
        y: GLOB_bgOffset.y + Tiles(6)
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
        x: GLOB_bgOffset.x + Tiles(4),
        y: GLOB_bgOffset.y + Tiles(6)
    },
    image: "dresser",
    folder: "home",
    location: "floor",
    interactable: true,
    solid: true,
    level: "home"
});

