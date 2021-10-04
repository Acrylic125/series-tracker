import { initTooltipListeners } from "./tooltip";

export async function loadStaticDocumentScripts() {
    
}

export async function reloadNonStaticDocumentScripts() {
    initTooltipListeners();
}