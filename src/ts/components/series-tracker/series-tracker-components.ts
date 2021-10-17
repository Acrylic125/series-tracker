import adaptiveResizers, { createPositionAdaptableElement } from "../modifiers/adaptive-size";
import { SeriesTracker } from "../../series/series";
import { SeriesTrackerTemplate, SeriesTrackerTemplateData, SeriesTrackerTemplates } from "../../series/templates/series-tracker-template";
import { Position } from "../../utils/html-utils";
import { randInt } from "../../utils/utils";
import { createDivWithClasses, createElementWithClasses, createInnerText, createTextAsHeightComponent } from "../global-components";
import { createTrackerModalDisplayer } from "./series-tracker-modal";

export function createSeriesTrackerStageTitle(title?: string, oninputcomplete?: (event: Event) => void) {
  const titleComponent = createTextAsHeightComponent({
    value: title,
    placeholder: "No Title",
    classes: [ 'series-trackers__title', 'title', 'input-focus-indicator' ],
    oninputcomplete
  });
  return titleComponent;
}

// <header> </header>
export function createSeriesTrackerHeader(title: string) {
  return createInnerText('header', (title) ? title : "No Title");
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
      titleElement.innerText = (seriesTracker.title) ? seriesTracker.title : "No Title";
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

export interface SeriesTrackerComponent {
  seriesTrackerElement: HTMLElement
  openModal(): void
}

export function createSeriesTrackerComponent(seriesTracker: SeriesTracker): SeriesTrackerComponent {
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