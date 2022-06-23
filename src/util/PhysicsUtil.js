export function calculateBounceVelocity(line, vIn) {
    // angle of the line it is bouncing off of
    const lineAngle = Math.atan2(line[0].y - line[1].y, line[1].x - line[0].x);
    // angle of the velocity
    const vAngle = Math.atan2(-vIn.y, vIn.x);

    const bounceAngle = vAngle - lineAngle;

    // const outAngle = lineAngle - alpha;
    const outAngle = Math.PI * 2 - bounceAngle + lineAngle;

    const speed = Math.sqrt(vIn.x ** 2 + vIn.y ** 2);

    const vX = Math.cos(outAngle) * speed;
    const vY = -Math.sin(outAngle) * speed;

    return [vX, vY];
}
