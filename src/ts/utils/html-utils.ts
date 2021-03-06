import { BrowserWindow } from 'electron';

export interface Position {
    x: number,
    y: number
}

export const PX = 'px';

export function setPosition(eleemnt: HTMLElement, position: Position) {
    const style = eleemnt.style;
    style.top = position.y + PX;
    style.left = position.x + PX;
}

export function loadHTML(window: BrowserWindow, html: string) {
    window.loadURL("data:text/html;charset=utf-8," + encodeURI(html));    
}

export function htmlToElement(document: Document, html: string) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}

export function hideOrShowElement<T extends HTMLElement>(element: T, visible: boolean) {
    element.style.visibility = (visible) ? 'visible' : 'hidden';
}

export function hideElement<T extends HTMLElement>(element: T) {
    element.style.visibility = 'hidden';
}

export function showElement<T extends HTMLElement>(element: T) {
    element.style.visibility = 'visible';
}

export function isElementHidden<T extends HTMLElement>(element: T) {
    return element.style.visibility === 'hidden';
}
