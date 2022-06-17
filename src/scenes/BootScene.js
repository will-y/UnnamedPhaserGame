import {Scene} from 'phaser';
import LevelBootScene from "./LevelBootScene";
import ItemRegistry from"../item/ItemRegistry";
import Item from "../item/Item";

class BootScene extends Scene {
    constructor() {
        super("scene-boot");
    }

    preload() {
        this.game.scene.add('level-1', new LevelBootScene('level-1'));

        // Register Items (Maybe make this JSON later)
        ItemRegistry.register(new Item("coin", "other"));
    }

    create() {
        this.scene.start('level-1');
    }
}

export default BootScene;
