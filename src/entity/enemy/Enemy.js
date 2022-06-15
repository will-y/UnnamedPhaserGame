import MovableEntity from "../MovableEntity";

class Enemy extends MovableEntity {
    constructor(scene, x, y, key, speed, player, trackRange, updateSpeed) {
        super(scene, x, y, key, speed, 0, player);

        // How far away can the enemy see the player
        this.trackRange = trackRange;
        // How fast the enemy reacts to changes
        this.updateSpeed = updateSpeed;
        this.player = player;
        this.updateTimer = 0;

        this.setUpEnemyAnimation();
    }

    setUpEnemyAnimation() {

    }


    onCollide(enemy, player) {}

    distanceToPlayer() {
        return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    }

    updateEntity(time, delta) {
        if (this.updateTimer >= this.updateSpeed) {
            this.updateTimer = 0;
            const playerDistance = this.distanceToPlayer();
            if (playerDistance > this.trackRange) {
                this.speed = 0;
                this.velocityChanged = true;
            } else {
                this.speed = this.maxSpeed;
                this.direction = (Math.atan2(this.y - this.player.y, this.player.x - this.x) * 180 / Math.PI + 360) % 360;
                this.velocityChanged = true;
            }
        } else {
            this.updateTimer++;
        }
        super.updateEntity(time, delta);
    }
}

export default Enemy;
