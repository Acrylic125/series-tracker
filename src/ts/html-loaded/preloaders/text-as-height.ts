export function resizeTextAsHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    if (element.scrollHeight > 0)
        element.style.height = element.scrollHeight + 'px';
}

export function addTextAsHeightListener(element: HTMLTextAreaElement) {
    element.addEventListener('input', () => resizeTextAsHeight(element));
}

export async function reloadAllTextAsHeight() {
    document.querySelectorAll('.text-as-height').forEach((textAsHeight) => {
        (textAsHeight instanceof HTMLTextAreaElement) && addTextAsHeightListener(textAsHeight);
    });
}
