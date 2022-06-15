export const setVelocityFromDirection = (speed, direction, physicsBody) => {
    const dx = Math.cos(direction * Math.PI / 180.0) * speed;
    const dy = -Math.sin(direction * Math.PI / 180.0) * speed;

    physicsBody.setVelocity(dx, dy);
}
