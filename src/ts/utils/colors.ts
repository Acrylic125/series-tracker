import { randInt, rgbToHex } from "./utils";

/**
 * These options act as constants for 2 components of the
 * RGB values. The 3rd component is a variant between 0 and
 * 255. This ensures a constant 'tone' of the color generated.
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
 export interface ColorOption {
    alphaConstant: number,
    betaConstant: number
}

export const BRIGHT_DEFAULT: ColorOption = {
    alphaConstant: 220,
    betaConstant: 20
};
export const DARK_DEFAULT: ColorOption = {
    alphaConstant: 184,
    betaConstant: 26
};

export function randColor(color: ColorOption, caseNumber = randInt(1, 6)) {
    const variant = randInt(0, 255);
    const { alphaConstant, betaConstant } = color;
    console.log(caseNumber);
    switch (caseNumber) {
        case 1:
            return rgbToHex(alphaConstant, betaConstant, variant);
        case 2:
            return rgbToHex(alphaConstant, variant, betaConstant);
        case 3:
            return rgbToHex(variant, alphaConstant, betaConstant);
        case 4:
            return rgbToHex(betaConstant, alphaConstant, variant);
        case 5:
            return rgbToHex(betaConstant, variant, alphaConstant);
        case 6:
            return rgbToHex(variant, betaConstant, alphaConstant);
        default:
            throw RangeError(`Case Number ${caseNumber} is out of range [1,6]!`);     
    }
}

export function randColorsSameCase(...colors: ColorOption[]) {
    return randColorsSameCaseSpecified(randInt(1, 6), ...colors);
}

export function randColorsSameCaseSpecified(caseNumber: number, ...colors: ColorOption[]) {
    const size = colors.length;
    const arr = new Array<string>(size);
    for (let i = 0; i < size; i++) {
        arr[i] = randColor(colors[i], caseNumber);
    }
    return arr;
}