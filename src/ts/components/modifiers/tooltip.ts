import { setPosition } from "../../utils/html-utils";

async function getTooltipsFromRegion(tooltipRegion: HTMLElement) {
    const toolTips: HTMLElement[] = new Array();
    tooltipRegion.querySelectorAll('.tooltip').forEach((tooltip) => {
        if (tooltip instanceof HTMLElement)
            toolTips.push(tooltip);
    });
    return toolTips;
}

export async function addTooltipListener(tooltipRegion: HTMLElement) {
    const toolTips = await getTooltipsFromRegion(tooltipRegion);
    if (toolTips.length > 0) {
        const tooltip = toolTips[0];
        tooltipRegion.onmouseover = () => {
            var { x, y, width, height } = tooltipRegion.getBoundingClientRect();
            const toolTipBB = tooltip.getBoundingClientRect();
            x = (x + (width * 0.5) - (toolTipBB.width * 0.5));
            y = y + height + 10;
            setPosition(tooltip, { x, y });
        }
    }
}