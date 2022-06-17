import {Scene} from 'phaser';
import LevelBootScene from "./LevelBootScene";

class BootScene extends Scene {
    constructor() {
        super("scene-boot");
    }

    preload() {
        this.game.scene.add('level-1', new LevelBootScene('level-1'));
    }

    create() {
        this.scene.start('level-1');
    }
}

export default BootScene;
