import { v4 } from 'uuid';
import { Position, setPosition } from '../../utils/html-utils';
import { parseFloatOrDefault, parseFloatOrUndefined } from '../../utils/utils';

/**
 * Adaptive Resizer works as an observer for elements which wishes to use
 * relative styling (like width, height, and position) with '%' based on another
 * element that would otherwise be very hard/impossible to do with CSS.
 */

export interface AdaptiveResize {
    dWidth: number
    dHeight: number
}

export interface AdaptiveResizerElement {
    element: HTMLElement
    adapt(adaptiveResize: AdaptiveResize): void
}

export interface AdaptiveResizer {
    resizeElements: AdaptiveResizerElement[]
    adaptFrom: HTMLElement
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
                x: this.relativePosition.x * adaptiveResize.dWidth,
                y: this.relativePosition.y * adaptiveResize.dHeight,
            });
        }
    }
}

export class AdaptiveResizers {
    constructor(private resizers: Map)
}

// export interface AdaptiveResizer {
//     terminate(): void
//     resize
//     resizeObserver: ResizeObserver
// }

// export interface AdaptiveResizerElementData {
//     relativePosition?: Position
//     relativeWidth?: number
//     relativeHeight?: number
// }

// export interface AdaptiveResizerElement {
//     element: HTMLElement
//     adaptFrom: HTMLElement
//     data: AdaptiveResizerElementData
// }

// export function extractAdaptiveSizeElementData(element: HTMLElement): AdaptiveResizerElementData {
//     const { relwidth, relheight, relposx, relposy } = element.dataset;
//     return {
//         relativeWidth: parseFloatOrUndefined(relwidth),
//         relativeHeight: parseFloatOrUndefined(relheight),
//         relativePosition: (relposx || relposy) ? {
//             x: parseFloatOrDefault(relposx, 0),
//             y: parseFloatOrDefault(relposy, 0)
//         } : undefined
//     };
// }

// export function toAdaptiveSizeElement(adaptiveElement: AdaptiveResizerElement) {
//     const { adaptFrom, element, data } = adaptiveElement;
//     if (!adaptFrom.id)
//         adaptFrom.id = v4();
//     const dataset = element.dataset;

//     (function mapData() {
//         dataset.targetid = adaptFrom.id;
//         dataset.relwidth = data.relativeWidth + '';
//         dataset.relheight = data.relativeHeight + '';
//         if (data.relativePosition) {
//             dataset.relposx = data.relativePosition.x + '';
//             dataset.relposy = data.relativePosition.y + '';
//         }
//     })();
// }

// export class AdaptiveObservers {

//     constructor(private observers: Map<string, ResizeObserver>) {}

//     public removeObserver(id: string) {
//         const observers = this.observers;
//         const observer = observers.get(id);
//         if (observer) {
//             observer.disconnect();
//             observers.delete(id);
//         }
//     }

//     public addObserver(id: string) {
//         this.removeObserver(id);
//         const rezizeObserver = new ResizeObserver((entries) => {
//             const adaptFrom = document.getElementById(id);
//             if (adaptFrom) {
//                 const bb = adaptFrom.getBoundingClientRect();
//                 const dWidth = bb.width * 0.01,
//                       dHeight = bb.height * 0.01;
//                 entries.forEach((entry) => {
    
//                 });
//             }
//         });
//         this.observers.set(id, rezizeObserver);
//     }

// }