import { text } from "stream/consumers";

const ACTIVE = 'active';
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

export interface ModalContent {
    element: HTMLElement
}

export interface Modal {
    modalElement: HTMLElement
    modalContent: ModalContent
    active: boolean
    deleteOnDeactivate: boolean
    setActive(active: boolean): void
}

// <div class="modal active">
//     <div class="modal__body rounded-2">
//         <div class="modal__buttons">
//             <button class="modal__button--close action-button circle">&times;</button>
//         </div>
//         <div class="modal__content">
//             <header class="modal__title-header">
//                 <p class="modal__title-header--title">Lorem ipsum dolor sit.</p>
//                 <p class="modal__title-header--subtitle">Lorem, ipsum dolor.</p>
//             </header>
//         </div>
//     </div>
// </div>

export const closeActionButton: ActionButton = {
    tooltip: {
        title: "Close Modal",
        text: "Click to close this modal."
    },
    innerText: "\u00D7",
    circular: true,
    singular: true
}

// <div class="modal__background"></div>
export function createModalBackground(modal: Modal) {
    const background = createDivWithClasses('modal__background');
    background.onclick = () => 
        modal.setActive(false);
    return background;
}

// <button class="modal__button--close action-button circle">&times;</button>
export function createModalCloseButton(modal: Modal) {
    const closeButton = createActionButton(closeActionButton);
    closeButton.classList.add('modal__button--close');
    closeButton.onclick = () => 
        modal.setActive(false);
    return closeButton;
}

// <div class="modal__buttons"> </div>
export function createModalButtons(modal: Modal) {
    const modalButtons = createDivWithClasses('modal__buttons');
    modalButtons.appendChild(createModalCloseButton(modal));
    return modalButtons;
}

// <div class="modal__body rounded-2"> </div>
export function createModalBody(modal: Modal) {
    const modalBody = createDivWithClasses('modal__body', 'rounded-2');
    modalBody.appendChild(createModalButtons(modal));
    const content = createModalContent();
    content.appendChild(modal.modalContent.element);
    modalBody.appendChild(content);
    return modalBody;
}

export interface ModalOptions {
    modalContent: ModalContent
    active?: boolean
    deleteOnDeactivate?: boolean
}

export function createModal(modalOptions: ModalOptions) {
    const modalElement = createDivWithClasses('modal');
    const modal: Modal = {
        modalElement, 
        modalContent: modalOptions.modalContent, 
        active: (modalOptions.active) ? true : false,
        deleteOnDeactivate: (modalOptions.deleteOnDeactivate) ? true : false,
        setActive(active: boolean) {
            this.active = active;
            const classes = this.modalElement.classList;
            if (active)
                classes.add(ACTIVE);
            else {
                classes.remove(ACTIVE);
                (this.deleteOnDeactivate) && modalElement.remove();
            }
        }
    };
    modalElement.appendChild(createModalBackground(modal));
    modalElement.appendChild(createModalBody(modal));
    modal.setActive(modal.active);
    return modal;
}

export function addModal(modalOptions: ModalOptions): Modal {
    const modal = createModal(modalOptions);
    document.body.appendChild(modal.modalElement);
    return modal;
}

export function createModalContent() {
    return createDivWithClasses('modal__content');
}