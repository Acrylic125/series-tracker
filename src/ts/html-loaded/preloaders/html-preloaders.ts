import { reloadColorPickers } from "./color-picker";
import { reloadTextAsHeight } from "./text-as-height";
import { initTooltipListeners } from "./tooltip";

export async function reloadGlobalScripts() {
    initTooltipListeners();
    // reloadColorPickers();
    reloadTextAsHeight();
}