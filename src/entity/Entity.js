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

    /**
     * Called by the boundary when the entity collides with it
     * The default behavior will be to block the entity's movement
     * Return true to make the boundary do nothing
     * Return false to make the boundary block the entity's movement
     */
    onBoundaryCollide() {
        return false;
    }
}

export default Entity;
