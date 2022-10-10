export function checkMaskCollision(sprite1: Sprite, sprite2: Sprite): boolean {
    // If bounding boxes don't overlap, return false
    if (sprite1.x + sprite1.width <= sprite2.x
        || sprite1.x >= sprite2.x + sprite2.width
        || sprite1.y + sprite1.height <= sprite2.y
        || sprite1.y >= sprite2.y + sprite2.height) {
        return false;
    }

    // Find min and max canvas y values to iterate
    const y1 = Math.max(sprite1.y, sprite2.y);
    const y2 = Math.min(sprite1.y + sprite1.height - 1, sprite2.y + sprite2.height - 1);

    // Find starting y positions within each sprite's mask
    let mask1Y = y1 - sprite1.y;
    let mask2Y = y1 - sprite2.y;

    // Get image mask for each sprite
    const sprite1Rows = sprite1.mask;
    const sprite2Rows = sprite2.mask;

    // Determine if we need to left or right shift mask 1 to align with mask 2 for testing
    const leftShift = sprite2.x - sprite1.x;
    const rightShift = sprite1.x - sprite2.x;

    // For each mask row to test...
    for (let y = y1; y <= y2; y++) {
        let mask1Row = sprite1Rows[mask1Y];
        let mask2Row = sprite2Rows[mask2Y];

        // Shift if necessary, preserving value as unsigned 32 bit
        if (leftShift > 0) {
            mask1Row = (mask1Row << leftShift) >>> 0;
        } else if (rightShift > 0) {
            mask1Row = (mask1Row >>> rightShift);
        }

        // Test if any bits collide
        if ((mask1Row & mask2Row) !== 0) return true;

        mask1Y++;
        mask2Y++;
    }

    return false; // No collision
}
