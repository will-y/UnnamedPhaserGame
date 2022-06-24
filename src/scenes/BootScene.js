import {Scene} from 'phaser';
import LevelBootScene from "./LevelBootScene";
import ItemRegistry from"../item/ItemRegistry";
import Item from "../item/Item";
import ProjectileWeapon from "../item/weapon/ProjectileWeapon";
import Weapon from "../item/weapon/Weapon";
import LaserProjectileWeapon from "../item/weapon/LaserProjectileWeapon";

class BootScene extends Scene {
    constructor() {
        super("scene-boot");
    }

    preload() {
        this.game.scene.add('level-1', new LevelBootScene('level-1'));

        // Register Items (Maybe make this JSON later)
        // Maybe do the same thing with entities later
        ItemRegistry.register(new Item("coin", "other"));
        ItemRegistry.register(new Weapon("sword", "primary"));
        ItemRegistry.register(new ProjectileWeapon("gun", "primary", 10, 200, "projectile-basic", 0.5, false, 0, false));
        ItemRegistry.register(new LaserProjectileWeapon("laser_gun", "primary", 5, 250, "laser", 1.25, false, 0, false, false));
    }

    create() {
        this.scene.start('level-1');
    }
}

export default BootScene;
