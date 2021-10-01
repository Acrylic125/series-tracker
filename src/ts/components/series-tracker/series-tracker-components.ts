
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

import { SeriesTracker } from "../../series/series";
import { Position } from "../../utils/html-utils";
import { createInnerText } from "../global-components";

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
export function createSeriesTrackerBackgroundCircle(color: string, background: HTMLElement, percentRelativePosition: Position) {
    const circle = document.createElement('div');
    circle.style.backgroundColor = color;
    circle.classList.add('series-tracker__bg--circle');
    return circle;
}

export function createSeriesTrackerBackground(circleColor: string) {
    const background = document.createElement('div');
    background.classList.add('series-tracker__bg');
    background.appendChild(createSeriesTrackerBackgroundCircle(circleColor, background, { x: 25, y: 32 }));
    return background;
}

export function createSeriesTracker(seriesTracker: SeriesTracker) {
    const seriesTrackerElement = document.createElement('div');
    seriesTrackerElement.classList.add('series-tracker');
    seriesTrackerElement.appendChild(createSeriesTrackerBackground(seriesTracker.circleColor));
    seriesTrackerElement.appendChild(createSeriesTrackerContent(seriesTracker));
    return seriesTrackerElement;
}