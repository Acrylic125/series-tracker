const TAG = 'tag';

//  <span class="series-card__tag"> </span>
export function createTag(tagName: string) {
    const tagElement = createElementWithClasses('span', TAG);
    tagElement.innerText = tagName;
    return tagElement;
}

const TOOLTIP = 'tooltip';
const TOOLTIP_TITLE = 'tooltip__title';
const TOOLTIP_TEXT = 'tooltip__text';

export interface Tooltip {
    title?: string,
    text?: string
}

// <div class="tooltip">
//   <p class="tooltip__title">Load More</p>
//   <p class="tooltip__text">Click to load more</p>
// </div>
export function createTooltip(tooltip: Tooltip) {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add(TOOLTIP);
    if (tooltip.title) {
        const title = document.createElement('p');
        title.classList.add(TOOLTIP_TITLE);
        title.innerText = tooltip.title;
        tooltipElement.appendChild(title);
    }
    if (tooltip.text) {
        const text = document.createElement('p');
        text.classList.add(TOOLTIP_TEXT);
        text.innerText = tooltip.text;
        tooltipElement.appendChild(text);
    }
    return tooltipElement;
}

export function bindTooltipTo(tooltipRegion: HTMLElement, tooltip: Tooltip) {
    tooltipRegion.classList.add('tooltip-region');
    tooltipRegion.appendChild(createTooltip(tooltip));
}

export interface ActionButton {
    tooltip?: Tooltip,
    innerText: string,
    circular?: boolean,
    singular?: boolean
}

export function createActionButton(actionButton: ActionButton) {
    const actionButtonElement = document.createElement('button');
    actionButtonElement.classList.add('action-button',
                                      (actionButton.circular) ? 'circle' : 'rounded-1');
    actionButtonElement.innerText = actionButton.innerText;
    if (actionButton.tooltip) 
        bindTooltipTo(actionButtonElement, actionButton.tooltip);
    if (actionButton.singular) {
        actionButtonElement.style.width = '2em';
        actionButtonElement.style.height = '2em';    
    }
    return actionButtonElement;
}

export function createHorzCenteredActionButton(actionButton: ActionButton) {
    const actionButtonElement = createActionButton(actionButton);
    actionButtonElement.classList.add('center-horz');
    return actionButtonElement;
}

const BOUNDED_STAGE_CONTENT = 'bounded-stage-content';

// <div class="bounded-stage-content"> </div>
export function createBoundedStageContent() {
    return createDivWithClasses(BOUNDED_STAGE_CONTENT);
}

// <div class="column"> </div>
export function createColumn() {
    return createDivWithClasses('column');
}

export function createColumns(columns: number) {
    const columnElements = new Array<HTMLElement>(columns);
    for (let i = 0; i < columns; i++)
        columnElements[i] = createColumn();
    return columnElements;
}

// <div class="line"></div>
export function createColorLine(color: string) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.backgroundColor = color;
    return line;
}

export function createInnerText(element: string, text: string) {
    const innerText = document.createElement(element);
    innerText.innerText = text;
    return innerText;
}

export function createElementWithClasses(element: string, ...classes: string[]) {
    const elementWithClasses = document.createElement(element);
    elementWithClasses.classList.add(...classes);
    return elementWithClasses;
}

export function createDivWithClasses(...classes: string[]) {
    return createElementWithClasses('div', ...classes);
}
