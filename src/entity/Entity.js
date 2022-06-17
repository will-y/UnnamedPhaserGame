class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, collideObject) {
        super(scene, x, y, key);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;

        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);

        if (collideObject) {
            this.collideObject = collideObject;
            // no longer using groups, idk if that is worse
            this.scene.physics.add.overlap(this, collideObject, this.onCollide);
        }
    }

    updateEntity(time, delta) {

    }

    onCollide(thisObject, collidingObject) {
        // by default don't need to do anything
        console.log("Actually here");
    }

    /**
     * Damages this entity (if applicable) call canDamage first
     */
    damage(amount) {

    }

    canDamage() {
        return false;
    }

    destroy(fromScene) {
        this.scene.entities = this.scene.entities.filter(x => {
            return !(x.x === this.x && x.y === this.y);
        });
        super.destroy(fromScene);
    }
}

export default Entity;
