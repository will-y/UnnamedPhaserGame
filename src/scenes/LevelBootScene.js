import {Scene} from 'phaser';
import RoomBootScene from "./RoomBootScene";

/**
 * Boots the level
 * Loads in all game common assets (Player, Weapons, Drops, Pickups...)
 * Also loads in level json file
 * Also need a starting room to load in
 */
class LevelBootScene extends Scene {
    constructor(key) {
        super(key);
        this.key = key;
    }

    preload() {
        // load in level json
        this.load.json(this.key, `assets/level/${this.key}.json`);

        // load in common things
        this.load.spritesheet('main-character', 'assets/sprite/main_character.png', {frameWidth: 28, frameHeight: 65});

        // load in starting room
        this.load.json(`${this.key}-start-room`, `assets/level/${this.key}-start-room.json`);
        this.game.scene.add(`${this.key}-start-room-boot`, new RoomBootScene(`${this.key}-start-room`));
    }

    create() {
        console.log(`Level Boot Scene Created [${this.key}]`);
        this.scene.start(`${this.key}-start-room-boot`);
    }
}

export default LevelBootScene;
