// Random color to use as "green screen" canvas background to identify transparent PNG pixels
const backgroundRed = 155;
const backgroundGreen = 76;
const backgroundBlue = 150;

function toHex(val: number) {
    return val.toString(16);
}

function rgbToHex(r: number, g: number, b: number) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const backgroundColor = rgbToHex(backgroundRed, backgroundGreen, backgroundBlue);

export function buildMask(image: HTMLImageElement): Uint32Array {
    // Create temporary canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Fill canvas with "green screen" color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.fill();
    
    // Draw PNG sprite image
    ctx.drawImage(image, 0, 0);
    
    // Read sprite and background pixel data back from canvas
    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    // Assign 4 bytes for each vertical row of sprite image
    const array = new Uint32Array(new ArrayBuffer(image.height * 4));

    for (let y = 0; y < image.height; y++) {
        const rowStartIndex = y * image.width * 4;

        let rowValue = 0;
        for (let x = 0; x < image.width; x++) {
            const pixelStartIndex = rowStartIndex + (x * 4);
            
            const red = imageData.data[pixelStartIndex];
            const green = imageData.data[pixelStartIndex + 1];
            const blue = imageData.data[pixelStartIndex + 2];
            // 4th byte is alpha
            
            // If this pixel is not the green screen color, add the bit value for this column to the total value for this row
            if (!(red === backgroundRed && green === backgroundGreen && blue === backgroundBlue)) {
                const bitValue = x === 31
                    ? 1
                    : Math.pow(2, 32 - (x + 1));
                rowValue += bitValue;
            }
        }

        // Assign the total 32 bit value to this row of the mask
        array[y] = rowValue;
    }

    return array;
}
