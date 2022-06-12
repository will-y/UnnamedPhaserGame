import {Scene} from 'phaser';
import RoomScene from "./RoomScene";

class RoomBootScene extends Scene {
    constructor(roomKey) {
        super("boot_" + roomKey);
        this.roomKey = roomKey;
    }

    preload() {
        // Using json load in other needed assets
        const roomData = this.cache.json.get(this.roomKey);

        this.game.scene.add(this.roomKey, new RoomScene(this.roomKey, roomData));
    }

    create() {

    }
}

export default RoomBootScene;
