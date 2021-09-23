import { randomInt } from "crypto";
import { randInt, rgbToHex } from "../utils/utils";
import ElementCover from "./element-cover";

export class ColorElementCover implements ElementCover {
    
    constructor(public color: string) {}
    
    public cover(element: HTMLElement) {
        element.style.backgroundColor = this.color;
    }
}

