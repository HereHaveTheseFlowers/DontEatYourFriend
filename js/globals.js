// !!!  CONSTANTS  !!!! //

/// TILES

const GLOB_interactionRange = 8;

const GLOB_exportRatio = 600;
const GLOB_tileSize = 16 * (GLOB_exportRatio / 100);
function Tiles(numberOfTiles) {
    return numberOfTiles * GLOB_tileSize
}
const GLOB_bgOffset = { x:  - Tiles(1), y: - Tiles(4) };

const Game = {
    state: "transition",
    debug: false,
    speed: 1,
    movement_slower: 2,
    active_dialogue: false
};

//////// NON - CONSTANTS ////////

let GLOB_movingSpeed = 6;

let floorObjs = [];
let bgObjs = [];
let playerObjs = [];
let inventoryObjs = [];
let debugObjs = [];
let upperObjs = [];

let solidObjs = [];
let interactableObjs = [];
let itemsObjs = [];

let pickupTimer = 0;
const pickupTimerCap = 30;
