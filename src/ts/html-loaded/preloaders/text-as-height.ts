import { undefinedOrDefault } from "../../utils/utils";

export function resizeTextAsHeight(element: HTMLTextAreaElement | HTMLInputElement) {
    element.style.height = '1em';
    element.style.height = element.scrollHeight + 'px';
}

export async function reloadTextAsHeight() {
    document.querySelectorAll('.text-as-height').forEach((textAsHeight) => {
        if ((textAsHeight instanceof HTMLTextAreaElement) || (textAsHeight instanceof HTMLInputElement)) {
            resizeTextAsHeight(textAsHeight);
            textAsHeight.oninput = () => resizeTextAsHeight(textAsHeight);
        }
    });
}