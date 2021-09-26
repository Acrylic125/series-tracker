import { BrowserWindow } from 'electron';

function loadHTML(window: BrowserWindow, html: string) {
    window.loadURL("data:text/html;charset=utf-8," + encodeURI(html));    
}

export function htmlToElement(document: Document, html: string) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}

const HIDDEN = 'hidden';
export function hideElement<T extends HTMLElement>(element: T) {
    element.classList.add(HIDDEN);
}

export function showElement<T extends HTMLElement>(element: T) {
    element.classList.remove(HIDDEN);
}

export function isElementHidden<T extends HTMLElement>(element: T) {
    return element.classList.contains(HIDDEN);
}