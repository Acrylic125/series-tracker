//        <div class="modal__content">
//           <header>
//             <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text"
//               placeholder="New Tracker Title"></textarea>
//             <div class="modal__header-content">
//               <p class="title">Tracker Display</p>
//               <p class="subtitle w-60 center-horz">Edit the tracker display style by clicking on the component you want
//                 to restyle
//                 below.
//               </p>
//               <div class="modal__tracker-styler rounded-2">
//                 <p class="modal__tracker-styler--text w-60">Sample Text</p>
//                 <div class="modal__tracker-styler--circle color-picker-input" style="width: 30%; top: 12%; left: 50%">
//                 </div>
//                 <div class="modal__tracker-styler--circle color-picker-input" style="width: 20%; top: 40%; left: 40%">
//                 </div>
//                 <div class="modal__tracker-styler--circle color-picker-input" style="width: 10%; top: 60%; left: 65%">
//                 </div>
//               </div>
//             </div>
//           </header>
//           <div class="modal__tracker-content rounded-2">
//             <select class="modal__tracker-template-selector title">
//               <option value="episodes-template">Episodes Template</option>
//               <option value="checklist-template">Checlick Template</option>
//             </select>
//             <p class="subtitle w-60 center-horz">Select a template to use. The selected template will be displayed.</p>
//             <div class="modal__tracker-template-content">
//               <button class="small-singular action-button center-horz rounded-1">&plus;</button>
//               <div class="template__episodes-container center-horz">
//                 <div class="template__episodes-container-item rounded-1">
//                   <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text"
//                     placeholder="Title"></textarea>
//                   <p class="text-lighter">Last Watched<br>Episode:</p>
//                   <input class="ol-input" placeholder="0" min="0" type="number">
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

import { addTextAsHeightListener } from "../modifiers/text-as-height";
import { seriesTemplateRegistry } from "../../registry/registries";
import { SeriesTracker } from "../../series/series";
import { episodesTemplate } from "../../series/templates/episodes-template";
import { SeriesTrackerTemplate } from "../../series/templates/series-tracker-template";
import { Position } from "../../utils/html-utils";
import { undefinedOrDefault } from "../../utils/utils";
import { createDivWithClasses, createElementWithClasses, createInnerText, createModal, Modal } from "../global-components";

// <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text" placeholder="New Tracker Title"></textarea>
export function createTrackerTitle(title?: string) {
    const titleElement =
         createElementWithClasses('textarea', 
            'text-as-height', 
            'title',
            'input-focus-indicator', 
            'no-border',
            'no-outline') as HTMLTextAreaElement;
    titleElement.placeholder = 'New Tracker Title';
    if (title) 
        titleElement.value = title;
    addTextAsHeightListener(titleElement);
    return titleElement;
}

//   <div class="modal__tracker-styler--circle color-picker-input" style="width: 10%; top: 60%; left: 65%"> </div>
export function createTrackerStylerCircle(circleColor: string, relWidth: number, relPosition: Position) {
    const stylerCircle = createDivWithClasses('modal__tracker-styler--circle', 'color-picker-input');
    stylerCircle.style.width = relWidth + '%';
    stylerCircle.style.left = relPosition.x + '%';
    stylerCircle.style.top = relPosition.y + '%';
    stylerCircle.style.background = circleColor;
    return stylerCircle;
}

// <div class="modal__tracker-styler rounded-2">
//   <p class="modal__tracker-styler--text w-60">Sample Text</p>
//   <div class="modal__tracker-styler--circle color-picker-input" style="width: 30%; top: 12%; left: 50%">
//   </div>
//   <div class="modal__tracker-styler--circle color-picker-input" style="width: 20%; top: 40%; left: 40%">
//   </div>
//   <div class="modal__tracker-styler--circle color-picker-input" style="width: 10%; top: 60%; left: 65%">
//   </div>
// </div>
export function createTrackerStyler(backgroundColor: string, circleColor: string) {
    const styler = createDivWithClasses('modal__tracker-styler', 'rounded-2');
    styler.appendChild(createInnerText('p', 'Sample Text', 'modal__tracker-styler--text', 'w-60'));
    styler.appendChild(createTrackerStylerCircle(circleColor, 30, { x: 50, y: 12 }));
    styler.appendChild(createTrackerStylerCircle(circleColor, 20, { x: 40, y: 40 }));
    styler.appendChild(createTrackerStylerCircle(circleColor, 10, { x: 65, y: 60 }));
    styler.style.backgroundColor = backgroundColor;
    return styler;
}

// <div class="modal__header-content">
// <p class="title">Tracker Display</p>
// <p class="subtitle w-60 center-horz">Edit the tracker display style by clicking on the component you want
//   to restyle below.
// </p>
// </div>
export function createModalHeaderContent(seriesTracker: SeriesTracker) {
    const headerContent = createDivWithClasses('modal__header-content');
    headerContent.appendChild(createInnerText('p', 'Tracker Display', 'title'));
    headerContent.appendChild(createInnerText('p', 'Edit the tracker display style by clicking on the component you want to restyle below.', 'subtitle', 'w-60', 'center-horz'));
    headerContent.appendChild(createTrackerStyler(seriesTracker.baseColor, seriesTracker.circleColor));
    return headerContent;
}

export function createModalHeader(seriesTracker: SeriesTracker) {
    const header = document.createElement('header');
    const titleElement = createTrackerTitle(seriesTracker.title);
    titleElement.addEventListener('input', () => seriesTracker.title = titleElement.value);

    header.appendChild(titleElement);
    header.appendChild(createModalHeaderContent(seriesTracker));
    return header;
}

// <select class="modal__tracker-template-selector title">
//   <option value="episodes-template">Episodes Template</option>
//   <option value="checklist-template">Checlick Template</option>
// </select>
export function createTrackerSelector(trackerModal: TrackerModalDisplayer) {
    const selector = createElementWithClasses('select', 'modal__tracker-template-selector', 'title') as HTMLSelectElement;
    seriesTemplateRegistry.getRegistry().forEach((template) => {
        const option = createInnerText('option', template.title) as HTMLInputElement;
        option.value = template.id;
        option.onselect = () => 
            trackerModal.useTemplate(template);
        selector.appendChild(option);
    });
    return selector;
} 

// <div class="modal__tracker-content rounded-2">
//  <p class="subtitle w-60 center-horz">Select a template to use. The selected template will be displayed.</p>
//  <div class="modal__tracker-template-content"> </div>
// </div>
export function createTrackerContent(trackerModal: TrackerModalDisplayer) {
    const content = createDivWithClasses('modal__tracker-content', 'rounded-2');
    content.appendChild(trackerModal.templateSelectorElement);
    content.appendChild(createInnerText('p', 'Select a template to use. The selected template will be displayed.', 'subtitle', 'w-60', 'center-horz'));
    content.appendChild(trackerModal.templateContentElement);
    trackerModal.useTemplate(episodesTemplate);
    return content;
}

export class TrackerModalDisplayer {
    
    public modal: Modal 
    public templateSelectorElement = createTrackerSelector(this);
    public templateContentElement = createDivWithClasses('modal__tracker-template-content');

    constructor(public seriesTracker: SeriesTracker) {
        this.modal = createModal({
            modalContent: {
                elements: [ createModalHeader(seriesTracker), createTrackerContent(this) ]
            },
            deleteOnDeactivate: true
        });
    }

    public useTemplate(seriesTemplate: SeriesTrackerTemplate) {
        this.seriesTracker.templates.selectedTemplateID = seriesTemplate.id;
        this.templateContentElement.innerText = '';
        const data = this.seriesTracker.templates.getTemplateDataByTemplate(seriesTemplate);
        seriesTemplate.applyModalContent(this.templateContentElement, data);
        this.templateSelectorElement.value = undefinedOrDefault(this.seriesTracker.templates.selectedTemplateID, '');
    }
}

export function createTrackerModalDisplayer(seriesTracker: SeriesTracker): TrackerModalDisplayer {
    return new TrackerModalDisplayer(seriesTracker);
}