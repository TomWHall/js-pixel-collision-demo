export async function loadImage(url: string): Promise<HTMLImageElement> {
    const image = document.createElement('img');
    image.src = url;

    return new Promise<HTMLImageElement>((resolve, reject) => {
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject(`Failed to load image from ${url}`);
        }
    });
}