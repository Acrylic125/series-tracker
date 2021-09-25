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