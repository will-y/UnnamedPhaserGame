import Entity from "./Entity";

class Pickup extends Entity {
    constructor(scene, x, y, key, player) {
        super(scene, x, y, key, player);
    }

    onCollide(thisObject, collidingObject) {
        // thisObject.disableBody(true, true);
        thisObject.destroy(true);
        //TODO: Do something with player
    }
}

export default Pickup;
