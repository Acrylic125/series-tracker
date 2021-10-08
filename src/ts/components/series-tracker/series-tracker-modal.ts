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
//             <div class="modal__tracker-content-template">
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

import { SeriesTracker } from "../../series/series";
import { Position } from "../../utils/html-utils";
import { createDivWithClasses, createElementWithClasses, createInnerText, createModal } from "../global-components";

// <textarea class="text-as-height title input-focus-indicator no-border no-outline" type="text" placeholder="New Tracker Title"></textarea>
export function createTrackerTitle() {
    const title =
         createElementWithClasses('textarea', 
                                  'text-as-height', 
                                  'title',
                                  'input-focus-indicator', 
                                  'no-border',
                                  'no-outline') as HTMLTextAreaElement;
   title.placeholder = 'New Tracker Title';
   return title;
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
    header.appendChild(createTrackerTitle());
    header.appendChild(createModalHeaderContent(seriesTracker));
    return header;
}

export function createTrackerModal(seriesTracker: SeriesTracker) {
    return createModal({
        modalContent: {
            elements: [ createModalHeader(seriesTracker) ]
        }
    });
}