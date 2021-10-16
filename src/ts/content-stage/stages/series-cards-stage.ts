import { createNewSeries, Series } from "../../series/series";
import seriesStorage, { storageImporter } from "../../series/series-storage";
import { testFilter } from "../../utils/filter";
import { iteratorToGenerator, peekGenerator } from "../../utils/generator";
import { hideElement, showElement } from "../../utils/html-utils";
import { toComparableString } from "../../utils/utils";
import { createOpenEditSeriesCallback, createSeriesCard } from "../../components/series-card-components";
import { ContentStageElements, FragmentedContentStage } from "../content-stage";
import { getContentStageElement } from '../content-stage-manager';
import { ActionButton, bindRightClickMenu, createActionButton, createBoundedStageContent, createElementWithClasses, createHorzCenteredActionButton } from "../../components/global-components";

// <ol class="series-cards"> </ol>
export function createSeriesCards() {
    return createElementWithClasses('ol', 'series-cards');
}

//   <input id="series-cards__filter" class="ol-input" placeholder="Filter">
function createSeriesCardsFilter() {
    const seriesCardsFilter = (createElementWithClasses('input', 'ol-input') as HTMLInputElement);
    seriesCardsFilter.id = 'series-cards__filter';
    seriesCardsFilter.placeholder = 'Filter';
    return seriesCardsFilter;
}

const loadMoreActionButton: ActionButton = {
    tooltip: {
        title: "Load More",
        text: "Click to load more"
    },
    innerText: '\u21E3',
    circular: true,
    singular: true
};

const addSeriesCardButton: ActionButton = {
    tooltip: {
        title: "Add New Series Trackers",
        text: "Click to create a new set of series trackers"
    },
    innerText: '\u002B',
    circular: false,
    singular: true
};

function createLoadMore() {
    return createHorzCenteredActionButton(loadMoreActionButton);
}

interface SeriesCardsStageElements extends ContentStageElements {
    readonly filterElement: HTMLInputElement
    readonly seriesCardsElement: HTMLElement
    readonly loadMoreElement: HTMLButtonElement
    readonly addSeriesTrackersButton: HTMLElement
}

function createSeriesCardsStageElements(): SeriesCardsStageElements {
    return {
        filterElement: createSeriesCardsFilter(),
        seriesCardsElement: createSeriesCards(),
        loadMoreElement: createLoadMore(),
        addSeriesTrackersButton: createActionButton(addSeriesCardButton),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent();
            this.addSeriesTrackersButton.classList.add('center-horz');
            stageContent.appendChild(this.filterElement);
            stageContent.appendChild(this.addSeriesTrackersButton);
            stageContent.appendChild(this.seriesCardsElement);
            stageContent.appendChild(this.loadMoreElement);
            
            fragment.appendChild(stageContent);
            return fragment;
        }
    }
}

// Planning to refactor.
class SeriesCardsStageDisplayer {
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
                }, 250);
            }
        }
    }

    public async freshLoad() {
        this.elements.seriesCardsElement.innerHTML = '';
        this.generator = iteratorToGenerator(seriesStorage.seriesMap.values());
        await this.loadMore();
    }

    private async loadMore(resultsLimit = 10) {
        hideElement(this.elements.loadMoreElement);
        const { generator, filterString } = this;
        if (generator) {
            var searches = 0;
            const next = async () => {
                if (searches >= resultsLimit)
                    return;
                const result = generator.next();
                const series = result.value;
                if (!series || result.done)
                    return;
                if (!filterString || testFilter(series, filterString)) {
                    this.addSeriesAsElement(series);
                    searches++;
                }
                next();
            };
            await next();
        }
        this.checkLoadMoreComplete();
    }

    public addSeriesAsElement(series: Series) {
        const seriesCardElement = createSeriesCard(series);
        const onClick = createOpenEditSeriesCallback(series);
        seriesCardElement.addEventListener('click', onClick);
        bindRightClickMenu(seriesCardElement, {
            buttons: [
                {
                    text: "Edit", onClick
                },
                {
                    text: "Delete",
                    onClick() {
                        seriesStorage.seriesMap.delete(series.id);
                        seriesCardElement.remove();
                    }
                }
            ]
        });
        this.elements.seriesCardsElement.appendChild(seriesCardElement);
    }

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

interface SeriesCardsStage extends FragmentedContentStage<SeriesCardsStageElements> {
    displayer?: SeriesCardsStageDisplayer
}

const seriesCardsStage: SeriesCardsStage = {
    async initialise() {
        this.elements = createSeriesCardsStageElements();
        getContentStageElement().appendChild(this.elements.toFragment());
        const displayer = new SeriesCardsStageDisplayer(this.elements);
        this.displayer = displayer;
        this.elements.addSeriesTrackersButton.addEventListener('click', () => {
            const series = createNewSeries('');
            const seriesCardElement = createOpenEditSeriesCallback(series);
            seriesStorage.seriesMap.set(series.id, series);
            seriesCardElement();
        });
        storageImporter.call(() => 
            displayer.freshLoad());
    }
};
export default seriesCardsStage;
