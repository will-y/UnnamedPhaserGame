const MAX_PRIMARY_WEAPONS = 4;

/**
 * Class for the player inventory
 */
class Inventory {
    constructor() {
        // All of these need to be maps item_id : {quantity, item object}
        // Primary weapons
        this.weapons = {};
        // Passive weapons
        this.passiveWeapons = {};
        // consumables
        this.consumables = {};
        // other items (gold, key items ...)
        this.otherItems = {};
    }

    /**
     * Adds the given weapon to the primary weapon list
     * If the list is full, need to figure out behavior
     * @param weapon
     */
    addPrimaryWeapon(weapon) {
        this.addItemToList(weapon, 1, this.weapons, false);
    }

    addPassiveWeapon(weapon) {
        this.addItemToList(weapon, 1, this.passiveWeapons, false);
    }

    addConsumable(consumable, quantity=1) {
        this.addItemToList(consumable, quantity, this.consumables, true);
    }

    addOtherItem(otherItem, quantity=1) {
        this.addItemToList(otherItem, quantity, this.otherItems, true);
    }

    /**
     * Adds any item to the inventory, automatically determining which list to put it in based off type
     * @param item - the item to add
     * @param quantity - the quantity to add
     */
    addItem(item, quantity=1) {
        const type = item.type;

        if (type === "primary") {
            this.addPrimaryWeapon(item);
        } else if (type === "passive") {
            this.addPassiveWeapon(item);
        } else if (type === "consumable") {
            this.addConsumable(item, quantity)
        } else if (type === "other") {
            this.addOtherItem(item, quantity);
        }
    }

    /**
     * Adds the given item to the given list
     * Compares names to add it correctly.
     * If already in either add or ignore
     * @param item - the item to add to the list
     * @param quantity - the number of the item to add
     * @param list - the list to add the item to
     * @param add - if true, add quantity, if false ignore if already in list
     */
    addItemToList(item, quantity, list, add) {
        const key = item.key;
        const objInList = list[key];

        if (objInList) {
            if (add) {
                objInList.quantity += quantity;
            }
        } else {
            list[key] = {
                item: item,
                quantity: quantity
            }
        }
    }

    /**
     * Gets the weapon in the slot
     * Returns null if slot > 3 or no weapon in that slot
     */
    getWeapon(slot) {
        const values = Object.values(this.weapons);
        if (!(slot < 0 || slot > 3 || slot > values.length)) {
            if (values[slot]) {
                return values[slot].item;
            }
        }

        return null;
    }
}

export default Inventory;
