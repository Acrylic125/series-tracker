export function resizeTextAsHeight(element: HTMLTextAreaElement | HTMLInputElement) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

export function addTextAsHeightListener(element: HTMLTextAreaElement | HTMLInputElement) {
    element.addEventListener('input', () => resizeTextAsHeight(element));
}

export async function reloadAllTextAsHeight() {
    document.querySelectorAll('.text-as-height').forEach((textAsHeight) => {
        ((textAsHeight instanceof HTMLTextAreaElement) || (textAsHeight instanceof HTMLInputElement)) && addTextAsHeightListener(textAsHeight);
    });
}