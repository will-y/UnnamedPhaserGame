import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const canvas = document.getElementById('game-canvas');
const config = {
    type: Phaser.WEB_GL,
    width: 800,
    height: 600,
    canvas,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        BootScene,
        GameScene
    ]
};

export const game = new Game(config);
