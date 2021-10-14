import { v4 } from 'uuid';
import { Position, setPosition } from '../../utils/html-utils';

/**
 * Adaptive Resizer works as an observer for elements which wishes to use
 * relative styling (like width, height, and position) with '%' based on another
 * element that would otherwise be very hard/impossible to do with CSS.
 */

export interface AdaptiveResize {
    adaptFrom: Element
    percentWidth: number
    percentHeight: number
}

export interface AdaptiveResizerElement {
    element: HTMLElement
    adapt(adaptiveResize: AdaptiveResize): void
}

export interface AdaptiveResizer {
    resizeElements: AdaptiveResizerElement[]
    observer: ResizeObserver
}

export interface AdaptivePositionResizerElement extends AdaptiveResizerElement {
    relativePosition: Position
}

export function createPositionAdaptableElement(element: HTMLElement, relativePosition: Position = { x: 0, y: 0 }): AdaptivePositionResizerElement {
    return {
        element,
        relativePosition,
        adapt(adaptiveResize: AdaptiveResize) {
            setPosition(this.element, {
                x: this.relativePosition.x * adaptiveResize.percentWidth,
                y: this.relativePosition.y * adaptiveResize.percentHeight,
            });
        }
    }
}

export class AdaptiveResizers {
    constructor(private resizers: Map<string, AdaptiveResizer> = new Map()) {}
    
    static createResizer(adaptFrom: HTMLElement): AdaptiveResizer {
        const resizeElements: AdaptiveResizerElement[] = new Array();
        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                const adaptFrom = entries[0].target;
                const bb = adaptFrom.getBoundingClientRect();
                const resize: AdaptiveResize = {
                    adaptFrom,
                    percentWidth: bb.width / 100,
                    percentHeight: bb.height / 100
                };
                resizeElements.forEach((adaptiveElement) => 
                    adaptiveElement.adapt(resize));
            }
        });
        observer.observe(adaptFrom);
        return {
            resizeElements, observer
        };
    }

    static terminateResizer(resizer: AdaptiveResizer) {
        resizer.observer.disconnect();
    }

    static getResizerKey(element: HTMLElement) {
        const currentKey = element.dataset.resizerkey;
        if (currentKey) 
            return (currentKey as string);
        const newKey = v4();
        element.dataset.resizerkey = newKey;
        return newKey;
    }

    public addResizerELement(resizerElement: AdaptiveResizerElement, adaptFrom: HTMLElement) {
        const resizer = this.getOrAddResizer(adaptFrom);
        resizer.resizeElements.push(resizerElement);
    }

    public getOrAddResizer(element: HTMLElement) {
        const resizerkey = AdaptiveResizers.getResizerKey(element);
        var resizer = this.getResizer(resizerkey);
        if (resizer) 
            return resizer;
        return this.addResizer(element);
    }

    public addResizer(element: HTMLElement) {
        const resizerkey = AdaptiveResizers.getResizerKey(element);
        var resizer = this.getResizer(resizerkey);
        if (resizer) 
            AdaptiveResizers.terminateResizer(resizer);
        resizer = AdaptiveResizers.createResizer(element);
        this.resizers.set(resizerkey, resizer);
        return resizer;
    }

    public getResizer(key: string) {
        return this.resizers.get(key);
    }

    public remove(key: string) {
        const resizer = this.getResizer(key);
        if (resizer) {
            AdaptiveResizers.terminateResizer(resizer);
            this.resizers.delete(key);
        }
    }

    public removeAll() {
        this.resizers.forEach((resizer) =>
            AdaptiveResizers.terminateResizer(resizer));
        this.resizers = new Map();
    }

}

const adaptiveResizers = new AdaptiveResizers();
export default adaptiveResizers;