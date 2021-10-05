import { reloadColorPickers } from "./color-picker";
import { initTooltipListeners } from "./tooltip";

export async function reloadGlobalScripts() {
    initTooltipListeners();
    reloadColorPickers();
}