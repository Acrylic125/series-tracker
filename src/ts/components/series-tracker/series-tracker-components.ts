import adaptiveResizers, { createPositionAdaptableElement } from "../../html-loaded/preloaders/adaptive-size";
import { SeriesTracker } from "../../series/series";
import { Position } from "../../utils/html-utils";
import { randInt } from "../../utils/utils";
import { createDivWithClasses, createInnerText } from "../global-components";

// <header> </header>
export function createSeriesTrackerHeader(title: string) {
    return createInnerText('header', title);
}

export function createSeriesTrackerContent(seriesTracker: SeriesTracker) {
    const { title, items } = seriesTracker;
    const contentElement = document.createElement('article');
    contentElement.classList.add('series-tracker__content');
    contentElement.appendChild(createSeriesTrackerHeader(title));
    const contentItemsElement = document.createElement('ol');
    items.forEach((contentItem) => 
        contentItemsElement.appendChild(contentItem.toComponent()));
    contentElement.appendChild(contentItemsElement);
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
    const circle = document.createElement('div');
    circle.style.backgroundColor = backgroundCircle.color;
    circle.classList.add('series-tracker__bg--circle');
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
    const seriesTrackerElement = document.createElement('div');
    seriesTrackerElement.style.backgroundColor = seriesTracker.baseColor;
    seriesTrackerElement.id = seriesTracker.id;
    seriesTrackerElement.classList.add('series-tracker');
    seriesTrackerElement.appendChild(createSeriesTrackerBackground(seriesTracker.circleColor, seriesTrackerElement));
    seriesTrackerElement.appendChild(createSeriesTrackerContent(seriesTracker));
    return seriesTrackerElement;
}