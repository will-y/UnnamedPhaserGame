/**
 * Class for a polygon boundary in the game
 * Used for the border of the room and for obstacles in the level
 */
class Boundary extends Phaser.GameObjects.Image {
    constructor(scene, x, y, key, path) {
        super(scene, x, y, key);
        this.path = path;
    }
}

export default Boundary;
