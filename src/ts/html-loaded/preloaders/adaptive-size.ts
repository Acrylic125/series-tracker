export interface AdaptiveResizer {
    terminate(): void
    resizeObserver: ResizeObserver
}

export function toAdaptiveSize(element: HTMLElement, adaptFrom: HTMLElement): AdaptiveResizer {
    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry.target.getBoundingClientRect());
        });
    }); 
    resizeObserver.observe(element);
    return {
        terminate() {

        }, 
        resizeObserver
    };
}