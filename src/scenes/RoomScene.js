import {Scene} from 'phaser';

class RoomScene extends Scene {
    constructor(key, roomData) {
        super(key);
        this.key = key;
        this.roomData = roomData;
    }

    preload() {
        // should already have everything loaded
    }

    create() {

    }

    update(time, delta) {

    }
}

export default RoomScene;
