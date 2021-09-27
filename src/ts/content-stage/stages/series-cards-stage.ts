import { Series } from "../../series/series";
import seriesStorage from "../../series/series-storage";
import { testFilter } from "../../utils/filter";
import { iteratorToGenerator, peekGenerator } from "../../utils/generator";
import { hideElement, showElement } from "../../utils/html-utils";
import { toComparableString } from "../../utils/utils";
import { ContentStage } from "../content-stage";
import { getContentStageElement } from '../content-stage-manager';

const SERIES_CARD_COLOR_STRIP = 'series-card__color-strip';
const SERIES_CARD_TITLE = 'series-card__content--title';
const SERIES_CARD_TAG = 'series-card__tag';
const SERIES_CARD_TAGS = 'series-card__content--tags';
const SERIES_CARD_CONTENT = 'series-card__content';
const SERIES_CARD = 'series-card';

const SERIES_CARDS_STAGE = "series-cards-stage";
const SERIES_CARDS_FILTER_ID= "series-cards__filter";
const SERIES_CARDS = "series-cards";

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
    if (tags.length > 0)
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

// <li class="series-card">
//   <span class="series-card__color-strip"> </span>
//   <span class="series-card__content"> </span>
// </li>
export function createSeriesCard(series: Series) {
    const seriesCardElement = document.createElement('li');
    seriesCardElement.classList.add(SERIES_CARD);
    seriesCardElement.appendChild(createSeriesCardColorStrip(series.colorStripColor));
    seriesCardElement.appendChild(createSeriesCardContent(series.title, ...series.tags));
    return seriesCardElement;
} 

// <ol class="series-cards"> </ol>
export function createSeriesCards() {
    const seriesCardCollection = document.createElement('ol');
    seriesCardCollection.classList.add(SERIES_CARDS);
    return seriesCardCollection;
} 

// <div class="series-cards-stage"> </div>
export function createSeriesCardsStage() {
    const seriesCardsStage = document.createElement('div');
    seriesCardsStage.classList.add(SERIES_CARDS_STAGE);
    return seriesCardsStage;
}

//   <input id="series-cards__filter" class="ol-input" placeholder="Filter">
function createSeriesCardsFilter() {
    const seriesCardsFilter = document.createElement('input');
    seriesCardsFilter.classList.add('ol-input');
    seriesCardsFilter.id = SERIES_CARDS_FILTER_ID;
    seriesCardsFilter.placeholder = 'Filter';
    return seriesCardsFilter;
}

function createLoadMore() {
    const loadMore = document.createElement('button');
    loadMore.classList.add('load-more', 'center-horz', 'circle');
    loadMore.innerText = '\u21E3';
    return loadMore;
}

interface SeriesCardsStageElements {
    readonly filterElement: HTMLInputElement;
    readonly seriesCardsElement: HTMLElement;
    readonly loadMoreElement: HTMLButtonElement;
    toFragment(): DocumentFragment
}

function createSeriesCardsStageElements(): SeriesCardsStageElements {
    return {
        filterElement: createSeriesCardsFilter(),
        seriesCardsElement: createSeriesCards(),
        loadMoreElement: createLoadMore(),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stage = createSeriesCardsStage();
            stage.appendChild(this.filterElement);
            stage.appendChild(this.seriesCardsElement);
            stage.appendChild(this.loadMoreElement);
                  
            fragment.appendChild(stage);
            return fragment;
        }
    }
}

// Planning to refactor.
class SeriesCardsStageProcess {
    private filterString: string = '';
    private generator?: Generator<Series>;

    constructor(private elements: SeriesCardsStageElements) {
        this.initElementEvents();
    }

    private initElementEvents() {
        const { loadMoreElement, filterElement } = this.elements;
        loadMoreElement.onclick = () => 
            this.loadMore();

        var doFilterCheck = true;
        filterElement.onkeyup = () => {
            if (doFilterCheck) {
                doFilterCheck = false;
                setTimeout(async () => {
                    this.filterString = toComparableString(filterElement.value);
                    await this.freshLoad();
                    doFilterCheck = true;
                }, 500);
            }
        }
    }

    public async freshLoad() {
        this.elements.seriesCardsElement.innerHTML = '';
        this.generator = iteratorToGenerator(seriesStorage.seriesMap.values());
        await this.loadMore();
    }

    private async loadMore(resultsLimit = 25) {
        hideElement(this.elements.loadMoreElement);
        const { generator, filterString } = this;
        const { seriesCardsElement } = this.elements;
        if (generator) {
            var searches = 0;
            const seriesCardsFragmnet = new DocumentFragment();
            const next = async () => {
                if (searches >= resultsLimit) 
                    return;
                const result = generator.next();
                const series = result.value;
                if (!series || result.done)  
                    return;
                if (!filterString || testFilter(series, filterString)) {
                    seriesCardsFragmnet.appendChild(createSeriesCard(series));
                    searches++;
                    this.c++;
                } 
                next();
            };
            await next();
            seriesCardsElement.appendChild(seriesCardsFragmnet);
        }
        this.checkLoadMoreComplete();
    }

    private c = 1;

    private checkLoadMoreComplete() {
        const generator = this.generator;
        if (generator) {
            const peek = peekGenerator(generator);
            if (peek.peekResult.value) {
                showElement(this.elements.loadMoreElement);
                this.generator = peek.newGenerator();
            } else {
                this.generator = undefined;
            }
        }
    }

}

interface SeriesCardsStage extends ContentStage {
    state?: SeriesCardsStageProcess,
    elements?: SeriesCardsStageElements
}

const seriesCardsStage: SeriesCardsStage = {
    async initialise() {
        this.elements = createSeriesCardsStageElements();
        getContentStageElement().appendChild(this.elements.toFragment());
        this.state = new SeriesCardsStageProcess(this.elements);
        await this.state.freshLoad();
    },
    reload() {

    },
    terminate() {

    }
};
export default seriesCardsStage;
