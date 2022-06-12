import {Scene} from 'phaser';
import RoomScene from "./RoomScene";

class RoomBootScene extends Scene {
    constructor(roomKey) {
        super(roomKey + "-boot");
        this.roomKey = roomKey;
    }

    preload() {
        // TODO: Using json load in other needed assets
        // Also check if asset exists already
        const roomData = this.cache.json.get(this.roomKey);
        const requiredAssets = roomData.requiredAssets;

        requiredAssets.forEach(asset => {
            if (!this.textures.list[asset.key]) {
                this.load.image(asset.key, asset.url);
                console.log("Loaded Asset for " + asset.key);
            }
        });

        this.game.scene.add(this.roomKey, new RoomScene(this.roomKey, roomData));
    }

    create() {
        console.log(`Room Boot Scene Created [${this.roomKey}]`);
        this.scene.start(this.roomKey);
    }
}

export default RoomBootScene;
