import LivingEntity from "../LivingEntity";

class Enemy extends LivingEntity {
    constructor(scene, x, y, key, speed, player, trackRange, updateSpeed, health) {
        super(scene, x, y, key, speed, 0, health, player);

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


    onCollide(enemy, player) {
    }

    /**
     * Gets the position of the player's feet to use for distance and tracking
     */
    getPlayerPosition() {
        return [this.player.x, this.player.y + this.player.height / 2];
    }

    distanceToPlayer() {
        const playerPos = this.getPlayerPosition();
        return Phaser.Math.Distance.Between(this.x, this.y, playerPos[0], playerPos[1]);
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
                const playerPos = this.getPlayerPosition();
                this.direction = (Math.atan2(this.y - playerPos[1], playerPos[0] - this.x) * 180 / Math.PI + 360) % 360;
                this.velocityChanged = true;
            }
        } else {
            this.updateTimer++;
        }
        super.updateEntity(time, delta);
    }

    kill() {
        this.destroy(true);
    }
}

export default Enemy;
