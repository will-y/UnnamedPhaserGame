class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;

        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
    }

    updateEntity(time, delta) {

    }
}

export default Entity;
