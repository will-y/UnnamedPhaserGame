import MovableEntity from "../MovableEntity";

class Enemy extends MovableEntity {
    constructor(scene, x, y, key, speed, player) {
        super(scene, x, y, key, player);

        scene.physics.add.existing(this);
        this.player = player;
        this.setUpEnemyAnimation();
    }

    setUpEnemyAnimation() {

    }


    onCollide(enemy, player) {}

}

export default Enemy;
