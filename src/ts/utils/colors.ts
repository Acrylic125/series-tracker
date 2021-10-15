import { throws } from "assert";
import { clamp, randInt } from "./utils";

export const BITS_4 = 2 << 23;
export const BITS_3 = 2 << 15;
export const BITS_2 = 2 << 7;

export const LOWER_COLOR_VALUE = 0,
             UPPER_COLOR_VALUE = 255;
export const HEX_PREFIX = '#';

export function clampColorValue(value: number) {
    return Math.floor(clamp(LOWER_COLOR_VALUE, value, UPPER_COLOR_VALUE));
}

export function isStringValidHexColor(color: string) {
    if (!color.startsWith(HEX_PREFIX))
        return false;
    const s = color.length;    
    return (s <= 8);
}

export interface Color {
    toHex(): string
    toPrefixedHex(prefix?: string): string
    toDecimal(): number
    brighten(percent: number): Color // where 0 is 0%, 1 is 100%
    darken(percent: number): Color // where 0 is 0%, 1 is 100%
    clone(): Color
}

export interface RGBColor extends Color {
    // RGB values [0, 255]
    red: number
    green: number
    blue: number
    // Alpha value [0, 1]
    alpha?: number
    set(red: number, green: number, blue: number): RGBColor
    setAlpha(alpha?: number): RGBColor
    brightenBase(percentRed: number, percentGreen: number, percentBlue: number): Color // where 0 is 0%, 1 is 100%
    darkenBase(percentRed: number, percentGreen: number, percentBlue: number): Color // where 0 is 0%, 1 is 100%
    clone(): RGBColor
}

export function toRGB(red: number, green: number, blue: number, alpha?: number): RGBColor {
    return {
        red, green, blue, alpha,
        set(red: number, green: number, blue: number) {
            this.red = clampColorValue(red);
            this.green = clampColorValue(green);
            this.blue = clampColorValue(blue);
            return this;
        },
        setAlpha(alpha?: number) {
            this.alpha = (alpha) ? clamp(0, alpha, 1) : undefined;
            return this;
        },
        clone() {
            return toRGB(this.red, this.green, this.blue, this.alpha);
        },
        toHex() {
            const dec = this.toDecimal();
            if (this.red == 0) 
                return '00' + dec.toString(16);
            else if (this.red <= 0xf)
                return '0' + dec.toString(16);
            return dec.toString(16);
        },
        toPrefixedHex(prefix: string = HEX_PREFIX) {
            return prefix + this.toHex();
        },
        toDecimal() {
            const { red, green, blue, alpha } = this;
            return (alpha) ? (red * BITS_4) + (green * BITS_3) + (blue * BITS_2) + Math.round((alpha * UPPER_COLOR_VALUE)) : 
                             (red * BITS_3) + (green * BITS_2) + blue; 
        },
        brightenBase(percentRed: number, percentGreen: number, percentBlue: number) {
            this.set(
                this.red + (percentRed * this.red),
                this.green + (percentGreen * this.green),
                this.blue + (percentBlue * this.blue)
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
        }
    }
    .set(red, green, blue)
    .setAlpha(alpha);
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

export function randColorByShade(shadeOptions: ColorShadeOptions, shadeCase = randInt(1, 6)): RGBColor {
    const variant = randInt(0, 255);
    const { alphaConstant, betaConstant } = shadeOptions;
    switch (shadeCase) {
        case 1:
            return toRGB(alphaConstant, betaConstant, variant);
        case 2:
            return toRGB(alphaConstant, variant, betaConstant);
        case 3:
            return toRGB(variant, alphaConstant, betaConstant);
        case 4:
            return toRGB(betaConstant, alphaConstant, variant);
        case 5:
            return toRGB(betaConstant, variant, alphaConstant);
        case 6:
            return toRGB(variant, betaConstant, alphaConstant);
        default:
            throw RangeError(`Case Number ${shadeCase} is out of range [1,6]!`); 
    }
}

