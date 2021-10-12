import { reloadColorPickers } from "./color-picker";
import { reloadAllTextAsHeight } from "./text-as-height";
import { initTooltipListeners } from "./tooltip";

export async function reloadGlobalScripts() {
    initTooltipListeners();
    reloadColorPickers();
    reloadAllTextAsHeight();
}