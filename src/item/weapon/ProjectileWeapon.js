import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(scene, player, projectileSpeed, projectileKey) {
        super(scene, player);
        this.projectileSpeed = projectileSpeed;
        this.projectileKey = projectileKey;
    }

    fireWeapon() {

    }

    summonProjectile() {

    }
}

export default ProjectileWeapon;
