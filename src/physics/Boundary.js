/**
 * Class for a polygon boundary in the game
 * Used for the border of the room and for obstacles in the level
 */
class Boundary extends Phaser.GameObjects.Image {
    constructor(scene, x, y, key, path) {
        super(scene, x, y, key);
        this.path = path;

        // Walls
        this.debug = this.scene.add.graphics({ lineStyle: { color: 0xffff00 } });
        console.log(this.debug)

        this.boundary = new Phaser.Geom.Polygon(path);

        // Will represent the current entity's body rect
        this.bodyRect = new Phaser.Geom.Rectangle();

        // Will hold a per-step velocity (distance)
        this.tempVelocity = new Phaser.Math.Vector2();
    }

    /**
     * Updates if the entities are blocked that are checked by boundary
     * @param time
     * @param delta
     * @param entities - entities to check against boundary
     */
    updateBoundary(time, delta, entities) {
        entities.forEach(entity => {
            // Ignore non-physics entities
            if (entity.body) {
                const body = entity.body;

                this.projectRect(this.bodyRect, body, 1 / this.scene.physics.world.fps);

                this.setBlocked(body.blocked, this.bodyRect, this.boundary);

                this.clampVelocity(body.velocity, body.blocked);
            }
        });

        if (this.scene.physics.world.drawDebug) {
            this.debug
                .clear()
                .strokePoints(this.boundary.points);
        }
    }

    projectRect(rect, body, time) {
        this.tempVelocity.copy(body.velocity).scale(time);
        Phaser.Geom.Rectangle.CopyFrom(body, rect);
        Phaser.Geom.Rectangle.OffsetPoint(rect, this.tempVelocity);
    }

    clampVelocity(velocity, blocked) {
        if (blocked.left) velocity.x = Phaser.Math.Clamp(velocity.x, 0, Infinity);
        if (blocked.right) velocity.x = Phaser.Math.Clamp(velocity.x, -Infinity, 0);
        if (blocked.up) velocity.y = Phaser.Math.Clamp(velocity.y, 0, Infinity);
        if (blocked.down) velocity.y = Phaser.Math.Clamp(velocity.y, -Infinity, 0);
    }

    setBlocked(blocked, rect, bounds) {
        if (!bounds.contains(rect.left, rect.top)) {
            blocked.left = true;
            blocked.up = true;
        }
        if (!bounds.contains(rect.left, rect.bottom)) {
            blocked.left = true;
            blocked.down = true;
        }
        if (!bounds.contains(rect.right, rect.top)) {
            blocked.right = true;
            blocked.up = true;
        }
        if (!bounds.contains(rect.right, rect.bottom)) {
            blocked.right = true;
            blocked.down = true;
        }

        blocked.none = !blocked.left && !blocked.right && !blocked.up && !blocked.down;
    }
}

export default Boundary;
