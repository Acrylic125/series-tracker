import iro from "@jaames/iro";
import { text } from "stream/consumers";
import { addTooltipListener } from "./modifiers/tooltip";
import { hideElement, hideOrShowElement } from "../utils/html-utils";
import { undefinedOrDefault } from "../utils/utils";

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
    addTooltipListener(tooltipRegion);
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
    if (actionButton.singular)
        actionButtonElement.classList.add('small-singular');
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

export function createInnerText(element: string, text: string, ...classes: string[]) {
    const innerText = document.createElement(element);
    innerText.innerText = text;
    classes.forEach((clazz) => innerText.classList.add(clazz));
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
    elements: HTMLElement[]
}

export interface Modal {
    modalElement: HTMLElement
    modalContent: ModalContent
    active: boolean
    deleteOnDeactivate: boolean
    onClose(): void
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
    modal.modalContent.elements.forEach((element) => 
        content.appendChild(element));
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
    var done = false;
    const modal: Modal = {
        modalElement, 
        modalContent: modalOptions.modalContent, 
        active: (modalOptions.active) ? true : false,
        deleteOnDeactivate: (modalOptions.deleteOnDeactivate) ? true : false,
        onClose() {},
        setActive(active: boolean) {
            this.active = active;
            const classes = this.modalElement.classList;
            if (active)
                classes.add(ACTIVE);
            else {
                classes.remove(ACTIVE);
                if (done)
                    return;
                this.onClose();
                if (this.deleteOnDeactivate) {
                    done = true;
                    modalElement.remove();
                }    
            }
        }
    };
    modalElement.appendChild(createModalBackground(modal));
    modalElement.appendChild(createModalBody(modal));
    if (modal.active)
        modalElement.classList.add(ACTIVE);
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

export function onElementClickOutside(element: HTMLElement, callback: (event: MouseEvent, terminate: () => void) => void) {
    const outsideClickListener = (event: MouseEvent) => {
        const target = event.target;
        if (target instanceof Node && !element.contains(target)) 
            callback(event, terminate);
    }
    document.addEventListener('click', outsideClickListener)
    const terminate = () => 
        document.removeEventListener('click', outsideClickListener);
}

export interface ColorPicker {
    colorPicker: iro.ColorPicker
    element: HTMLElement
    active: boolean
    deleteOnClose: boolean
    activate(active: boolean): void
}

export interface ColorPickerOptions {
    active?: boolean
    deleteOnClose?: boolean
    onColorPick?: (colorPicker: ColorPicker, color: iro.Color) => void
}

export function createColorPicker(options?: ColorPickerOptions) {
    const colorPickerElement = createDivWithClasses('color-picker');
    const colorPicker = iro.ColorPicker(colorPickerElement, {
        width: 120,
        height: 120
    });
    const colorPickerLiteral: ColorPicker = {
        element: colorPickerElement, colorPicker, active: false, deleteOnClose: false,
        activate(active) {
            colorPickerLiteral.active = active;
            hideOrShowElement(colorPickerElement, active);
        }
    }
    onElementClickOutside(colorPickerElement, (event, terminate) => {
        if (colorPickerLiteral.deleteOnClose) {
            colorPickerElement.remove();
            terminate();
        } else if (colorPickerLiteral.active) {
            colorPickerLiteral.activate(false);
        }
    });

    // Options Declarations
    if (options) {
        const { onColorPick, active, deleteOnClose } = options;
        if (onColorPick) {
            colorPicker.on('color:change', (color: any) => 
                onColorPick(colorPickerLiteral, color));
        }
        colorPickerLiteral.active = undefinedOrDefault(active, false);
        if (deleteOnClose)
            colorPickerLiteral.deleteOnClose = deleteOnClose;
    }
    colorPickerLiteral.activate(colorPickerLiteral.active);
    return colorPickerLiteral;
}