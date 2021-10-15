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
            const newY = y + height + 5;
            y = ((newY + toolTipBB.height) > window.innerHeight) ? y - height - 5 : newY;
            console.log(`${newY} ${window.innerHeight}`);
            setPosition(tooltip, { x, y });
        }
    }
}