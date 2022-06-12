import {Scene} from 'phaser';

/**
 * Boots the level
 * Loads in all game common assets (Player, Weapons, Drops, Pickups...)
 * Also loads in level json file
 */
class LevelBootScene extends Scene {
    constructor(key) {
        super(key);
    }
}
