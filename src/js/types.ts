interface Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    
    image: HTMLImageElement;
    mask: Uint32Array;
}