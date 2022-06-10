import {Scene} from 'phaser';

class BootScene extends Scene {
    constructor() {
        super("scene-boot");
    }

    preload() {
        // Load any assets here from your assets directory
        // this.load.image('main-character', 'assets/sprite/mc_forward.png');
        this.load.spritesheet('main-character', 'assets/sprite/main_character.png', {frameWidth: 28, frameHeight:64})
        this.load.image('coin', 'assets/sprite/coin.png');
    }

    create() {
        this.scene.start('scene-game');
    }
}

export default BootScene;
