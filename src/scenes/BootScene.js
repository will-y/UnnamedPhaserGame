import {Scene} from 'phaser';
import RoomBootScene from "./RoomBootScene";
import LevelBootScene from "./LevelBootScene";

class BootScene extends Scene {
    constructor() {
        super("scene-boot");
    }

    preload() {
        // Load any assets here from your assets directory
        // this.load.image('main-character', 'assets/sprite/mc_forward.png');
        // this.load.spritesheet('main-character', 'assets/sprite/main_character.png', {frameWidth: 28, frameHeight:64})
        // this.load.image('coin', 'assets/sprite/coin.png');
        this.game.scene.add('level-1', new LevelBootScene('level-1'));
    }

    create() {
        // this.scene.start('scene-game');
        this.scene.start('level-1');
    }
}

export default BootScene;
