import adaptiveResizers, { createPositionAdaptableElement } from "../../html-loaded/preloaders/adaptive-size";
import { addTextAsHeightListener } from "../../html-loaded/preloaders/text-as-height";
import { SeriesTracker } from "../../series/series";
import { Position } from "../../utils/html-utils";
import { randInt } from "../../utils/utils";
import { createDivWithClasses, createElementWithClasses, createInnerText } from "../global-components";
import { createTrackerModal } from "./series-tracker-modal";

export function createSeriesTrackerTitle(title?: string) {
  const titleElement = createElementWithClasses('textarea',
                                                     'text-as-height', 
                                                     'title',
                                                     'w-60',
                                                     'font-size-2',
                                                     'input-focus-indicator',
                                                     'no-border',
                                                     'no-outline') as HTMLTextAreaElement;
  titleElement.placeholder = 'Title';
  if (title) 
      titleElement.value = title;
  addTextAsHeightListener(titleElement);
  return titleElement;
}

// <header> </header>
export function createSeriesTrackerHeader(title: string) {
    return createInnerText('header', title);
}

export function createSeriesTrackerContent(seriesTracker: SeriesTracker) {
    const { title, templates } = seriesTracker;
    const contentElement = document.createElement('article');
    contentElement.classList.add('series-tracker__content');
    contentElement.appendChild(createSeriesTrackerHeader(title));
    const template = templates.getSelectedTemplate(),
          data = templates.getSelectedTemplateData();
    (template && data) &&
      contentElement.appendChild(template.createTrackerContent(data));
    return contentElement;
}

export interface BackgroundCircle {
  color: string,
  relativePosition: Position,
  relativeSize: number
} 

// <div class="series-tracker__bg">
//   <div class="series-tracker__bg--circle" style="top: 5em; left: 8em;"></div>
//   <div class="series-tracker__bg--circle" style="width: 3em; top: 2em; left: 1em;"></div>
// </div>
// <div class="series-tracker__bg--circle" style="top: 5em; left: 8em;"></div>
export function createSeriesTrackerBackgroundCircle(seriesTrackerElement: HTMLElement, backgroundCircle: BackgroundCircle) {
    const circle = createDivWithClasses('series-tracker__bg--circle');
    circle.style.backgroundColor = backgroundCircle.color;
    circle.style.width = backgroundCircle.relativeSize + '%';
    adaptiveResizers.addResizerELement(createPositionAdaptableElement(circle, backgroundCircle.relativePosition), seriesTrackerElement);
    return circle;
}

export function createSeriesTrackerBackground(circleColor: string, seriesTrackerElement: HTMLElement) {
    const background = createDivWithClasses('series-tracker__bg');
    const circles = randInt(3, 4);
    const alpha = 100 / circles;
    var beta = randInt(15, 24);
    for (let i = 0; i < circles; i++) {
      beta -= (randInt(9, 12) / circles);
      background.appendChild(
        createSeriesTrackerBackgroundCircle(seriesTrackerElement, {
          relativeSize: beta,
          relativePosition: {
            x: randInt(45, 90),
            y: randInt(((i - 1) * alpha) + 15, (i * alpha) + 15)
          },
          color: circleColor
        })
      );
    }
    return background;
}

export function createSeriesTracker(seriesTracker: SeriesTracker) {
    const seriesTrackerElement = createDivWithClasses('series-tracker');
    seriesTrackerElement.onclick = () => {
      const modal = createTrackerModal(seriesTracker);
      modal.modal.setActive(true);
      document.body.appendChild(modal.modal.modalElement);
    };
    
    seriesTrackerElement.style.backgroundColor = seriesTracker.baseColor;
    seriesTrackerElement.id = seriesTracker.id;
    seriesTrackerElement.appendChild(createSeriesTrackerBackground(seriesTracker.circleColor, seriesTrackerElement));
    seriesTrackerElement.appendChild(createSeriesTrackerContent(seriesTracker));
    return seriesTrackerElement;
}