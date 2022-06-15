import MovableEntity from "../MovableEntity";

class Enemy extends MovableEntity {
    constructor(scene, x, y, key, speed, player, trackRange, updateSpeed) {
        super(scene, x, y, key, speed, player);

        // How far away can the enemy see the player
        this.trackRange = trackRange;
        // How fast the enemy reacts to changes
        this.updateSpeed = updateSpeed;
        this.player = player;

        this.setUpEnemyAnimation();
    }

    setUpEnemyAnimation() {

    }


    onCollide(enemy, player) {}

    distanceToPlayer() {
        return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    }

    updateEntity(time, delta) {
        super.updateEntity(time, delta);
    }
}

export default Enemy;
