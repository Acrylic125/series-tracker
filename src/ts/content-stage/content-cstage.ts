import { createContext } from "vm";
import { Series } from "../series/series";
import { ContentStage } from "./content-stage";

//         <div class="series-card">
//           <span class="series-card__color-strip"></span>
//           <span class="series-card__content">
//             <p class="series-card__content--title"> </p>
//             <ol class="series-card__content--tags">
//               <li class="series-card__tag"> </li>
//             </ol>
//           </span>
//         </div>

const SERIES_CARD_COLOR_STRIP = 'series-card__color-strip';
const SERIES_CARD_TITLE = 'series-card__content--title';
const SERIES_CARD_TAG = 'series-card__tag';
const SERIES_CARD_TAGS = 'series-card__content--tags';
const SERIES_CARD_CONTENT = 'series-card__content';
const SERIES_CARD = 'series-card';

// <span class="series-card__color-strip"></span>
export function createSeriesCardColorStrip(document: Document, color: string) {
    const colorStripElement = document.createElement('span');
    colorStripElement.classList.add(SERIES_CARD_COLOR_STRIP);
    colorStripElement.style.backgroundColor = color;
    return colorStripElement;
}

// <p class="series-card__content--title"></p>
export function createSeriesCardTitle(document: Document, title: string) {
    const titleElement = document.createElement('p');
    titleElement.classList.add(SERIES_CARD_TITLE);
    titleElement.innerText = title;
    return titleElement;
}

//  <li class="series-card__tag"> </li>
export function createSeriesCardTag(document: Document, tagName: string) {
    const tagElement = document.createElement('li');
    tagElement.classList.add(SERIES_CARD_TAG);
    tagElement.innerText = tagName;
    return tagElement;
}

// <ol class="series-card__content--tags"> </ol>
export function createSeriesCardTags(document: Document, ...tags: string[]) {
    const tagElement = document.createElement('ol');
    tagElement.classList.add(SERIES_CARD_TAGS);
    tags.forEach((tag) => 
        tagElement.appendChild(createSeriesCardTag(document, tag)));
    return tagElement;
}

// <span class="series-card__content"> </span>
export function createSeriesCardContent(document: Document, title: string, ...tags: string[]) {
    const contentElement = document.createElement('span');
    contentElement.classList.add(SERIES_CARD_CONTENT);
    contentElement.appendChild(createSeriesCardTitle(document, title));
    contentElement.appendChild(createSeriesCardTags(document, ...tags));
    return contentElement;
}

// <div class="series-card">
//   <span class="series-card__color-strip"> </span>
//   <span class="series-card__content"> </span>
// </div>
export function createSeriesCard(document: Document, series: Series) {
    const seriesCardElement = document.createElement('div');
    seriesCardElement.classList.add(SERIES_CARD);
    seriesCardElement.appendChild(createSeriesCardColorStrip(document, series.colorStripColor));
    seriesCardElement.appendChild(createSeriesCardContent(document, series.title));
    return seriesCardElement;
}

const contentCStage: ContentStage = {
    content(document: Document, contentStageElement: HTMLElement): Node {
        
    }
}

export default contentCStage;