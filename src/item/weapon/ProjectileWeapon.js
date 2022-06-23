import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(key, type, attackSpeed, projectileSpeed, projectileKey, bounce=false, multishot=0, heatSeek=false) {
        super(key, type);
        this.projectileSpeed = projectileSpeed;
        this.projectileKey = projectileKey;
        this.attackCooldown = attackSpeed;
        this.attackCooldownCounter = this.attackCooldown;
        this.bounce = bounce;
        this.multishot = multishot;
        this.heatSeek = heatSeek;
    }

    useItem(source) {
        // Attacking
        if (this.attackCooldownCounter >= this.attackCooldown) {
            this.attackCooldownCounter = 0;
            const mouse = source.scene.game.input.mousePointer;
            const angle = (Math.atan2(-(mouse.worldY - source.y), mouse.worldX - source.x) * 180 / Math.PI + 360) % 360;
            source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle, source, true, 20, this.bounce, this.heatSeek);

            const multiAngle = 90 / (this.multishot + 1);

            for (let i = 0; i < this.multishot; i++) {
                source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle + multiAngle * (i + 1), source, true, 20, this.bounce, this.heatSeek);
                source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle - multiAngle * (i + 1), source, true, 20, this.bounce, this.heatSeek);
            }
        }

        if (this.attackCooldownCounter < this.attackCooldown) {
            this.attackCooldownCounter++;
        }
    }
}

export default ProjectileWeapon;
