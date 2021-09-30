import { setPosition } from "../../utils/html-utils";

export async function initTooltipListeners() {
    document.querySelectorAll('.tooltip-region').forEach(async (tooltipRegion) => {
        if (tooltipRegion instanceof HTMLElement) 
            await addTooltipListener(tooltipRegion);
    });
}

async function getTooltipsFromRegion(tooltipRegion: HTMLElement) {
    const toolTips: HTMLElement[] = new Array();
    tooltipRegion.querySelectorAll('.tooltip').forEach((tooltip) => {
        if (tooltip instanceof HTMLElement)
            toolTips.push(tooltip);
    });
    return toolTips;
}

async function addTooltipListener(tooltipRegion: HTMLElement) {
    const toolTips = await getTooltipsFromRegion(tooltipRegion);
    if (toolTips.length > 0) {
        const tooltip = toolTips[0];
        tooltipRegion.onmouseover = (event) => {
            const { width } = tooltip.getBoundingClientRect();
            const x = (event.pageX - (width * 0.5));
            const y = event.pageY + 5;
            setPosition(tooltip, { x, y });
        }
    }
}