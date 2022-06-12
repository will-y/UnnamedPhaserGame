import {Scene} from 'phaser';

class FloorScene extends Scene {
    constructor(key) {
        super(key);
        this.key = key;
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
