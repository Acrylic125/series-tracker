"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var window = new electron_1.BrowserWindow({
    width: 720,
    minWidth: 720,
    height: 600,
    resizable: true,
    fullscreen: false,
    webPreferences: {
        nativeWindowOpen: true,
        nodeIntegration: true
    }
});
exports.default = window;
