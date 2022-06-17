import Entity from "./Entity";
import ItemRegistry from "../item/ItemRegistry";

class Pickup extends Entity {
    constructor(scene, x, y, key, player, quantity) {
        super(scene, x, y, key, player);

        // Get the item that this pickup is an instance of
        this.item = ItemRegistry.getItem(key);
        this.quantity = quantity;
    }

    onCollide(pickup, player) {
        // thisObject.disableBody(true, true);
        pickup.destroy(true);
        player.inventory.addItem(pickup.item, pickup.quantity);
    }
}

export default Pickup;
