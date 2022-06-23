import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(key, type, attackSpeed, projectileSpeed, projectileKey, projectileScale, bounce=false, multishot=0, heatSeek=false, split=false) {
        super(key, type);
        this.projectileSpeed = projectileSpeed;
        this.projectileKey = projectileKey;
        this.projectileScale = projectileScale;
        this.attackCooldown = attackSpeed;
        this.attackCooldownCounter = this.attackCooldown;
        this.bounce = bounce;
        this.multishot = multishot;
        this.heatSeek = heatSeek;
        this.split = split;
    }

    useItem(source) {
        // Attacking
        if (this.attackCooldownCounter >= this.attackCooldown) {
            this.attackCooldownCounter = 0;
            const mouse = source.scene.game.input.mousePointer;
            const angle = (Math.atan2(-(mouse.worldY - source.y), mouse.worldX - source.x) * 180 / Math.PI + 360) % 360;
            source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle, source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);

            const multiAngle = 90 / (this.multishot + 1);

            for (let i = 0; i < this.multishot; i++) {
                source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle + multiAngle * (i + 1), source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);
                source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle - multiAngle * (i + 1), source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);
            }
        }

        if (this.attackCooldownCounter < this.attackCooldown) {
            this.attackCooldownCounter++;
        }
    }
}

export default ProjectileWeapon;
