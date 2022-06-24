import ProjectileWeapon from "./ProjectileWeapon";
import LaserProjectile from "../../entity/projectile/LaserProjectile";

class LaserProjectileWeapon extends ProjectileWeapon {
    summonProjectile(x, y, key, speed, direction, source, friendly, damage, scale, bounce, heatSeek, split) {
        // Going to need to be more than just player eventually
        const targets = source.scene.getTargets(friendly);
        const projectile = new LaserProjectile(source.scene, x, y, key, speed, direction, source, targets, damage, 500, scale, bounce, heatSeek, split);
        source.scene.summonProjectile(projectile);
        projectile.anims.play("laser_move", true);
    }
}

export default LaserProjectileWeapon;
