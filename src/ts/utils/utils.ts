export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const RED_HEX = 2 << 15;
export const GREEN_HEX = 2 << 7;
export const BLUE_HEX = 1;

export function rgbToDec(r: number, g: number, b: number) {
    return (r * RED_HEX) + (g * GREEN_HEX) + b; 
}

export function rgbToHex(r: number, g: number, b: number) {
    return rgbToDec(r, g, b).toString(16);
}