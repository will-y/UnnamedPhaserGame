import {Scene} from 'phaser';

class FloorScene extends Scene {
    constructor() {
        // TODO: figure out how to do this
        super("floor-1");
        this.key = "floor-1";
    }

    preload() {
        const floor = this.load.json(this.key, "assets/level/floor-1.json");
        console.log(floor);
    }

    create() {

    }

    update(time, delta) {

    }
}

export default FloorScene;