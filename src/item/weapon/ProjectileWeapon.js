import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(key, type, attackSpeed, projectileSpeed, projectileKey) {
        super(key, type);
        this.projectileSpeed = projectileSpeed;
        this.projectileKey = projectileKey;
        this.attackCooldown = attackSpeed;
        this.attackCooldownCounter = this.attackCooldown;
    }

    useItem(source) {
        // Attacking
        if (this.attackCooldownCounter >= this.attackCooldown) {
            this.attackCooldownCounter = 0;
            const mouse = source.scene.game.input.mousePointer;
            const angle = (Math.atan2(-(mouse.worldY - source.y), mouse.worldX - source.x) * 180 / Math.PI + 360) % 360;
            source.scene.summonProjectile(source.x, source.y, this.projectileKey, this.projectileSpeed, angle, source, true, 20);
        }

        if (this.attackCooldownCounter < this.attackCooldown) {
            this.attackCooldownCounter++;
        }
    }

    summonProjectile() {

    }
}

export default ProjectileWeapon;
