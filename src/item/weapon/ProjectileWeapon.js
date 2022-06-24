import Weapon from "./Weapon";
import Projectile from "../../entity/projectile/Projectile";

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

    useItem(source, attack) {
        // Attacking
        if (attack.isDown && this.attackCooldownCounter >= this.attackCooldown) {
            this.attackCooldownCounter = 0;
            const mouse = source.scene.game.input.mousePointer;
            const angle = (Math.atan2(-(mouse.worldY - source.y), mouse.worldX - source.x) * 180 / Math.PI + 360) % 360;
            this.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle, source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);

            const multiAngle = 90 / (this.multishot + 1);

            for (let i = 0; i < this.multishot; i++) {
                this.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle + multiAngle * (i + 1), source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);
                this.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle - multiAngle * (i + 1), source, true, 20, this.projectileScale, this.bounce, this.heatSeek, this.split);
            }
        }

        if (this.attackCooldownCounter < this.attackCooldown) {
            this.attackCooldownCounter++;
        }
    }

    summonProjectile(x, y, key, speed, direction, source, friendly, damage, scale, bounce, heatSeek, split) {
        // Going to need to be more than just player eventually
        const targets = source.scene.getTargets(friendly);
        const projectile = new Projectile(source.scene, x, y, key, speed, direction, source, targets, damage, 500, scale, bounce, heatSeek, split);
        source.scene.summonProjectile(projectile);
    }
}

export default ProjectileWeapon;
