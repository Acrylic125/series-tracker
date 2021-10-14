export function toResizeTextAsHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    if (element.scrollHeight > 0)
        element.style.height = element.scrollHeight + 'px';
}

export function addTextAsHeightListener(element: HTMLTextAreaElement) {
    element.addEventListener('input', () => toResizeTextAsHeight(element));
}

