/**
 * Class for holding all of the items in the game
 */
class ItemRegistry {
    // Object to hold items
    static items = {};

    /**
     * Registers an item class
     * @param item - instantiated item class
     */
    static register(item) {
        this.items[item.key] = item;
    }

    static getItem(key) {
        return this.items[key];
    }
}

export default ItemRegistry;
