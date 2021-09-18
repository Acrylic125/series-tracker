"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadHTML(window, html) {
    window.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
}
