import { throws } from "assert";
import { clamp, randInt } from "./utils";

export const RED_HEX = 2 << 15;
export const GREEN_HEX = 2 << 7;
export const BLUE_HEX = 1;

export const LOWER_COLOR_VALUE = 0,
             UPPER_COLOR_VALUE = 255;

export function clampColorValue(value: number) {
    return clamp(LOWER_COLOR_VALUE, value, UPPER_COLOR_VALUE);
}

export function rgbToDec(rgb: RGB) {
    return (rgb.red * RED_HEX) + (rgb.green * GREEN_HEX) + rgb.blue; 
}

export function rgbToHex(rgb: RGB) {
    return rgbToDec(rgb).toString(16);
}

export interface RGB {
    red: number
    green: number
    blue: number
    set(red: number, green: number, blue: number): RGB
    clone(): RGB
}

export function toRGB(red: number, green: number, blue: number): RGB {
    return {
        red: clampColorValue(red),
        green: clampColorValue(green),
        blue: clampColorValue(blue),
        set(red: number, green: number, blue: number) {
            this.red = clampColorValue(red);
            this.green = clampColorValue(green);
            this.blue = clampColorValue(blue);
            return this;
        },
        clone() {
            return toRGB(this.red, this.green, this.blue);
        }
    }
}

export interface Color {
    rgb: RGB
    toHex(): string
    toPrefixedHex(prefix: string): string
    toDecimal(): number
    brightenBase(percentRed: number, percentGreen: number, percentBlue: number): Color // where 0 is 0%, 1 is 100%
    darkenBase(percentRed: number, percentGreen: number, percentBlue: number): Color // where 0 is 0%, 1 is 100%
    brighten(percent: number): Color // where 0 is 0%, 1 is 100%
    darken(percent: number): Color // where 0 is 0%, 1 is 100%
    clone(): Color
}

export function toColor(rgb: RGB): Color {
    return {
        rgb,
        toHex() {
            return rgbToHex(rgb);
        },
        toPrefixedHex(prefix: string = '#') {
            return prefix + this.toHex();
        },
        toDecimal() {
            return rgbToDec(rgb);
        },
        brightenBase(percentRed: number, percentGreen: number, percentBlue: number) {
            const rgb = this.rgb;
            rgb.set(
                rgb.red + (percentRed * UPPER_COLOR_VALUE),
                rgb.green + (percentGreen * UPPER_COLOR_VALUE),
                rgb.blue + (percentBlue * UPPER_COLOR_VALUE)
            )
            return this;
        },
        brighten(percent: number) {
            return this.brightenBase(percent, percent, percent);
        },
        darkenBase(percentRed: number, percentGreen: number, percentBlue: number) {
            return this.brightenBase(-percentRed, -percentGreen, -percentBlue)
        },
        darken(percent: number) {
            return this.darkenBase(percent, percent, percent);
        },
        clone() {
            return toColor(this.rgb.clone());
        }
    }
}

/**
 * These options act as constants for 2 components of the
 * RGB values. The 3rd component is a variant between 0 and
 * 255. This ensures a constant shade of the color generated.
 * 
 * Example:
 * alphaConstant = 125, betaConstant = 15
 * 
 * ALL PERMUTATIONS:
 * RGB_1 = 125, 15, [0, 255]
 * RGB_2 = 125, [0, 255], 15
 * RGB_3 = [0, 255], 125, 15
 * RGB_4 = 15, 125, [0, 255]
 * RGB_5 = 15, [0, 255], 125
 * RGB_6 = [0, 255], 15, 125
 */
 export interface ColorShadeOptions {
    alphaConstant: number
    betaConstant: number
}

export const BRIGHT_SHADE: ColorShadeOptions = {
    alphaConstant: 220,
    betaConstant: 20
};
export const DARK_SHADE: ColorShadeOptions = {
    alphaConstant: 184,
    betaConstant: 26
};

export function randColorByShade(shadeOptions: ColorShadeOptions, shadeCase = randInt(1, 6)): Color {
    const variant = randInt(0, 255);
    const { alphaConstant, betaConstant } = shadeOptions;
    var rgb;
    switch (shadeCase) {
        case 1:
            return toColor(toRGB(alphaConstant, betaConstant, variant));
        case 2:
            return toColor(toRGB(alphaConstant, variant, betaConstant));
        case 3:
            return toColor(toRGB(variant, alphaConstant, betaConstant));
        case 4:
            return toColor(toRGB(betaConstant, alphaConstant, variant));
        case 5:
            return toColor(toRGB(betaConstant, variant, alphaConstant));
        case 6:
            return toColor(toRGB(variant, betaConstant, alphaConstant));
        default:
            throw RangeError(`Case Number ${shadeCase} is out of range [1,6]!`); 
    }
}

