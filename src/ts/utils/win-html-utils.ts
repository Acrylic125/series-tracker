import { BrowserWindow } from 'electron';

function loadHTML(window: BrowserWindow, html: string) {
    window.loadURL("data:text/html;charset=utf-8," + encodeURI(html));    
}