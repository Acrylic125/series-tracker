import { useStage } from "../content-stage/content-stage-manager";
import { createSeriesStage } from "../content-stage/stages/series-trackers-stage";
import { Series } from "../series/series";
import { createElementWithClasses, createInnerText, createTag } from "./global-components";

// <span class="series-card__color-strip"></span>
export function createSeriesCardColorStrip(color: string) {
    const colorStripElement = createElementWithClasses('span', 'series-card__color-strip');
    colorStripElement.style.backgroundColor = color;
    return colorStripElement;
}

// <p class="series-card__content--title"></p>
export function createSeriesCardTitle(title: string) {
    return createInnerText('p', (title) ? title : 'No Title', 'series-card__content--title');
}

// <ol class="series-card__content--tags"> </ol>
export function createSeriesCardTags(...tags: string[]) {
    const tagElement = createElementWithClasses('ol', 'series-card__content--tags');
    if (tags.length > 0)
        tags.forEach((tag) =>
            tagElement.appendChild(createTag(tag)));
    return tagElement;
}

// <span class="series-card__content"> </span>
export function createSeriesCardContent(title: string, ...tags: string[]) {
    const contentElement = createElementWithClasses('span', 'series-card__content');
    contentElement.appendChild(createSeriesCardTitle(title));
    contentElement.appendChild(createSeriesCardTags(...tags));
    return contentElement;
}

export function createOpenEditSeriesCallback(series: Series) {
    return async () => useStage(createSeriesStage(series));
}

// <li class="series-card">
//   <span class="series-card__color-strip"> </span>
//   <span class="series-card__content"> </span>
// </li>
export function createSeriesCard(series: Series) {
    const seriesCardElement = createElementWithClasses('li', 'series-card');
    seriesCardElement.id = series.id;
    seriesCardElement.appendChild(createSeriesCardColorStrip(series.colorStripColor));
    seriesCardElement.appendChild(createSeriesCardContent(series.title, ...series.tags));
    return seriesCardElement;
}