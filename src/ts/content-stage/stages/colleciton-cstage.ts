import { Series } from "../../series/series";
import seriesStorage from "../../series/series-storage";
import { ContentStage, getContentStageElement } from "../content-stage";

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
export function createSeriesCardColorStrip(color: string) {
    const colorStripElement = document.createElement('span');
    colorStripElement.classList.add(SERIES_CARD_COLOR_STRIP);
    colorStripElement.style.backgroundColor = color;
    return colorStripElement;
}

// <p class="series-card__content--title"></p>
export function createSeriesCardTitle(title: string) {
    const titleElement = document.createElement('p');
    titleElement.classList.add(SERIES_CARD_TITLE);
    titleElement.innerText = title;
    return titleElement;
}

//  <li class="series-card__tag"> </li>
export function createSeriesCardTag(tagName: string) {
    const tagElement = document.createElement('li');
    tagElement.classList.add(SERIES_CARD_TAG);
    tagElement.innerText = tagName;
    return tagElement;
}

// <ol class="series-card__content--tags"> </ol>
export function createSeriesCardTags(...tags: string[]) {
    const tagElement = document.createElement('ol');
    tagElement.classList.add(SERIES_CARD_TAGS);
    tags.forEach((tag) => 
        tagElement.appendChild(createSeriesCardTag(tag)));
    return tagElement;
}

// <span class="series-card__content"> </span>
export function createSeriesCardContent(title: string, ...tags: string[]) {
    const contentElement = document.createElement('span');
    contentElement.classList.add(SERIES_CARD_CONTENT);
    contentElement.appendChild(createSeriesCardTitle(title));
    contentElement.appendChild(createSeriesCardTags(...tags));
    return contentElement;
}

// <div class="series-card">
//   <span class="series-card__color-strip"> </span>
//   <span class="series-card__content"> </span>
// </div>
export function createSeriesCard(series: Series) {
    const seriesCardElement = document.createElement('div');
    seriesCardElement.classList.add(SERIES_CARD);
    seriesCardElement.appendChild(createSeriesCardColorStrip(series.colorStripColor));
    seriesCardElement.appendChild(createSeriesCardContent(series.title));
    return seriesCardElement;
} 

interface CollectionContentStage extends ContentStage {
    iterator?: Iterator<Series>
    fragment?: DocumentFragment

}

export class CollectionContentIterator {
    
}

// 
const collectionContentStage: CollectionContentStage = {
    onInitialise() {
        const iterator = seriesStorage.seriesMap.values(),
              fragment = new DocumentFragment();
        this.iterator = iterator;
        this.fragment = fragment;
        
        for (const series of iterator) 
            fragment.appendChild(createSeriesCard(series));
        getContentStageElement().appendChild(fragment);
    },
    onUpdate() {
        
    },
    onTerminate() {

    }
};
export default collectionContentStage;
