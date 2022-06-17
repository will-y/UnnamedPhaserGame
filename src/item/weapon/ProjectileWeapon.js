import Weapon from "./Weapon";

class ProjectileWeapon extends Weapon {
    constructor(key, projectileSpeed, projectileKey) {
        super(key);
        this.projectileSpeed = projectileSpeed;
        this.projectileKey = projectileKey;
    }

    useItem() {

    }

    summonProjectile() {

    }
}

export default ProjectileWeapon;
