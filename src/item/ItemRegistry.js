/**
 * Class for holding all of the items in the game
 */
class ItemRegistry {
    // Object to hold items
    static items = {};

    /**
     * Registers an item class
     * @param key - registration key of the item
     * @param item - instantiated item class
     */
    static register(key, item) {
        this.items[key] = item;
    }

    static getItem(key) {
        return this.items[key];
    }
}
