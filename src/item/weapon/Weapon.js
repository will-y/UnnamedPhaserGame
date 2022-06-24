import Item from "../Item";

class Weapon extends Item {
    constructor(key, type) {
        super(key, type);
    }

    useItem(scene, attack) {
        console.log("Sword used");
    }
}

export default Weapon;
