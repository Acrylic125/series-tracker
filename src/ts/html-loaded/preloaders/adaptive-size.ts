export interface AdaptiveResizer {
    terminate(): void
    resizeObserver: ResizeObserver
}

export function toAdaptiveSize(element: HTMLElement, adaptFrom: HTMLElement): AdaptiveResizer {
    console.log(adaptFrom.getBoundingClientRect());
    return {
        terminate() {

        }, 
        resizeObserver: new ResizeObserver(() => {})
    };
}