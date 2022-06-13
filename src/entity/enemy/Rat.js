import Enemy from "./Enemy";

class Rat extends Enemy {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
    }

    setUpEnemyAnimation() {
        this.scene.anims.create({
            key: "rat_still",
            frames: [{key: 'rat', frame: 0}],
            frameRate: 20
        });

        this.scene.anims.create({
            key: "rat_forward",
            frames: this.anims.generateFrameNumbers('rat', {start: 0, end: 2}),
            frameRate: 16,
            repeat: -1
        });

        this.scene.anims.create({
            key: "rat_attack",
            frames: this.anims.generateFrameNames('rat', {start: 3, end: 10}),
            frameRate: 32
        });
    }

    updateEntity(time, delta) {
        // this.anims.play('rat_attack', true);
    }
}

export default Rat;
