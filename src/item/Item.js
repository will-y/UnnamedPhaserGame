/**
 * Base class for all items
 * This will just be item data, on use effects...
 * Will NOT be the entity version of the item
 * That will normally be a pickup entity
 * Not all items need an item entity
 * Items are the things that are stored in the inventory
 * In theory should only need one item instance per item type
 * At minimum one per scene?
 */
class Item {
    /**
     *
     * @param key - key for item sprite (for inventory and ground if a pickup)
     */
    constructor(key) {
        this.key = key;
    }

    /**
     * Function for item use effect
     * Can be when used from inventory (health potion)
     * Also weapon effects are here
     */
    useItem() {

    }
}
