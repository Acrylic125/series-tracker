(async function initTooltipListeners() {
    document.querySelectorAll('.tooltip-region').forEach(async (tooltipRegion) => {
        if (tooltipRegion instanceof HTMLElement) 
            await addTooltipListener(tooltipRegion);
    })
})();

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
    tooltipRegion.onmouseover = (event) => {
        const x = event.pageX;
        const y = event.pageY;
        toolTips.forEach((tooltip) => {
            tooltip.style.left = x + "px";
            tooltip.style.top = y + "px";
       });
    }
}