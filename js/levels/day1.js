
const treeHome = new Sprite({
    name: "treeHome",
    position: {
        x: GLOB_bgOffset.x + Tiles(3),
        y: GLOB_bgOffset.y + Tiles(0)
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
            for(let obj of floorObjs)
                if(obj.level === this.level) {
                    obj.position.y -= Tiles(4);
                    obj.position.x -= Tiles(-2);
                }
            for(let obj of upperObjs)
                if(obj.level === this.level) {
                    obj.position.y -= Tiles(4);
                    obj.position.x -= Tiles(-2);
                }
            for(let obj of bgObjs)
                if(obj.level === this.level) {
                    obj.position.y -= Tiles(4);
                    obj.position.x -= Tiles(-2);
                }
            for(let obj of debugObjs)
                if(obj.level === this.level) {
                    obj.position.y -= Tiles(4);
                    obj.position.x -= Tiles(-2);
                }
            
            chat.setText("You went inside your home.");
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
  