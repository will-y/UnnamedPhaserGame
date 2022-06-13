import Entity from "../Entity";

class Enemy extends Entity {
    constructor(scene, x, y, key, speed, player) {
        super(scene, x, y, key);

        scene.physics.add.existing(this);
        this.speed = speed;
        this.player = player;
        this.setUpEnemyAnimation();
    }

    setUpEnemyAnimation() {

    }
}

export default Enemy;
