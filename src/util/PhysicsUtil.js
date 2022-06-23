export function calculateBounceVelocity(line, vIn) {
    // angle of the line it is bouncing off of
    const lineAngle = Math.atan2(line[1].y - line[0].y, line[0].x - line[1].x);
    // angle of the velocity
    const vAngle = Math.atan2(-vIn.y, vIn.x);

    const outAngle = lineAngle - vAngle;

    const speed = Math.sqrt(vIn.x ** 2 + vIn.y ** 2);

    const vX = Math.cos(outAngle) * speed;
    const vY = Math.sin(outAngle) * speed;

    return [vX, vY];
}
