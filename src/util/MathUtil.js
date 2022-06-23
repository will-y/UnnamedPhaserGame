/**
 * Calculates the distance from an entity to a line defined by p1 and p2
 * @param p1
 * @param p2
 * @param entity
 */
export function distanceFromLine(p1, p2, entity) {
    return Math.abs((p2.x - p1.x) * (p1.y - entity.y) - (p1.x - entity.x) * (p2.y - p1.y)) / Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
}

/**
 * Calculates the distance from an entity to a line segment defined by p1 and p2
 * Stole it from: https://stackoverflow.com/a/6853926
 * @param p1
 * @param p2
 * @param entity
 * @returns {number}
 */
export function distanceFromLineSegment(p1, p2, entity) {
    const x = entity.x;
    const y = entity.y;
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;

    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) //in case of 0 length line
        param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Returns the min element of the array passed in
 * if returnIndex is true it will return an array of [min value, index of min value]
 * @param array
 * @param returnIndex
 * @returns {(number|number)[]|number}
 */
export function arrayMin(array, returnIndex=false) {
    let min = Infinity;
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
            index = i;
        }
    }

    if (returnIndex) {
        return [min, index];
    } else {
        return min;
    }
}
