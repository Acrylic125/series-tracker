
/**
 *          <div class="series-tracker">
              <div class="series-tracker__bg">
                <div class="series-tracker__bg--circle"></div>
              </div>
              <article class="series-tracker__content">
                <header>Seasons</header>
                <ol>
                  <li>
                    <p class="series-tracker__content-item--title">Season 1</p>
                    <p class="series-tracker__content-item--status">Episode 24</p>
                  </li>
                </ol>
              </article>
            </div>
 */

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

// <div class="series-tracker__bg">
//   <div class="series-tracker__bg--circle" style="top: 5em; left: 8em;"></div>
//   <div class="series-tracker__bg--circle" style="width: 3em; top: 2em; left: 1em;"></div>
// </div>
// <div class="series-tracker__bg--circle" style="top: 5em; left: 8em;"></div>
export function createSeriesTrackerBackgroundCircle(color: string, seriesTrackerElement: HTMLElement, percentRelativePosition: Position) {
    const circle = document.createElement('div');
    // circle.style.backgroundColor = color;
    circle.classList.add('series-tracker__bg--circle');
    circle.style.width = randInt(10, 25) + '%';
    adaptiveResizers.addResizerELement(createPositionAdaptableElement(circle, {
      x: randInt(35, 95),
      y: randInt(10, 90)
    }), seriesTrackerElement);
    return circle;
}

export function createSeriesTrackerBackground(circleColor: string, seriesTrackerElement: HTMLElement) {
    const background = createDivWithClasses('series-tracker__bg');
    const circles = randInt(2, 3);
    for (let i = 0; i < circles; i++) {
      background.appendChild(createSeriesTrackerBackgroundCircle(circleColor, seriesTrackerElement, { x: 25, y: 32 }));
    }
    return background;
}

export function createSeriesTracker(seriesTracker: SeriesTracker) {
    const seriesTrackerElement = document.createElement('div');
    seriesTrackerElement.id = seriesTracker.id;
    seriesTrackerElement.classList.add('series-tracker');
    seriesTrackerElement.appendChild(createSeriesTrackerBackground(seriesTracker.circleColor, seriesTrackerElement));
    seriesTrackerElement.appendChild(createSeriesTrackerContent(seriesTracker));
    return seriesTrackerElement;
}