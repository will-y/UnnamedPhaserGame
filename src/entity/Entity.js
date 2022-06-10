class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
    }
}

export default Entity;