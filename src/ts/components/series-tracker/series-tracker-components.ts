import adaptiveResizers, { createPositionAdaptableElement } from "../modifiers/adaptive-size";
import { addTextAsHeightListener } from "../modifiers/text-as-height";
import { SeriesTracker } from "../../series/series";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData, SeriesTrackerTemplates } from "../../series/templates/series-tracker-template";
import { Position } from "../../utils/html-utils";
import { randInt } from "../../utils/utils";
import { bindRightClickMenu, createDivWithClasses, createElementWithClasses, createInnerText } from "../global-components";
import { createTrackerModalDisplayer } from "./series-tracker-modal";
import { SeriesTrackersDisplayer } from "../../content-stage/stages/series-trackers-stage";

export function createSeriesTrackerStageTitle(title?: string) {
  const titleElement = 
  createElementWithClasses('textarea',
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
    const contentElement = createElementWithClasses('article', 'series-tracker__content'),
          titleElement = createSeriesTrackerHeader(title),
          container = createDivWithClasses('w-100');;

    contentElement.appendChild(titleElement);
    contentElement.appendChild(container);

    tryUpdateTemplateData();
    return {
      contentElement, updateTrackerContent
    };

    async function updateTemplateData(template: SeriesTrackerTemplate, data: SeriesTrackerTemplateData) {
      container.innerText = '';
      container.appendChild(template.createSeriesTrackerContent(data));
    }

    async function tryUpdateTemplateData() {
      const template = templates.getSelectedTemplate(),
            data = templates.getSelectedTemplateData();
      (template && data) && updateTemplateData(template, data); 
    }

    async function updateTrackerContent() {
      titleElement.innerText = seriesTracker.title;
      tryUpdateTemplateData();
    };
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

export function createSeriesTrackerComponent(seriesTracker: SeriesTracker) {
    const seriesTrackerElement = createDivWithClasses('series-tracker');
    const trackerContent = createSeriesTrackerContent(seriesTracker);
    
    seriesTrackerElement.style.backgroundColor = seriesTracker.baseColor;
    seriesTrackerElement.id = seriesTracker.id;
    
    seriesTrackerElement.appendChild(createSeriesTrackerBackground(seriesTracker.circleColor, seriesTrackerElement));
    seriesTrackerElement.appendChild(trackerContent.contentElement);
    
    const openModal =  () => {
      const modal = createTrackerModalDisplayer(seriesTracker);
      modal.modal.setActive(true);
      document.body.appendChild(modal.modal.modalElement);
      modal.modal.onClose = () => trackerContent.updateTrackerContent();
    };
    seriesTrackerElement.addEventListener('click', openModal);
    return { seriesTrackerElement, openModal};
}