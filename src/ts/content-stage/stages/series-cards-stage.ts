import { Series } from "../../series/series";
import seriesStorage from "../../series/series-storage";
import { testFilter } from "../../utils/filter";
import { iteratorToGenerator, peekGenerator } from "../../utils/generator";
import { hideElement, showElement } from "../../utils/html-utils";
import { toComparableString } from "../../utils/utils";
import { createSeriesCard } from "../../components/series-card-components";
import { ContentStageElements, FragmentedContentStage } from "../content-stage";
import { getContentStageElement } from '../content-stage-manager';
import { ActionButton, createBoundedStageContent, createElementWithClasses, createHorzCenteredActionButton } from "../../components/global-components";

const SERIES_CARDS_FILTER_ID = "series-cards__filter";
const SERIES_CARDS = "series-cards";

// <ol class="series-cards"> </ol>
export function createSeriesCards() {
    return createElementWithClasses('ol', SERIES_CARDS);
}

//   <input id="series-cards__filter" class="ol-input" placeholder="Filter">
function createSeriesCardsFilter() {
    const seriesCardsFilter = (createElementWithClasses('input', 'ol-input') as HTMLInputElement);
    seriesCardsFilter.id = SERIES_CARDS_FILTER_ID;
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
}

function createLoadMore() {
    return createHorzCenteredActionButton(loadMoreActionButton);
}

interface SeriesCardsStageElements extends ContentStageElements {
    readonly filterElement: HTMLInputElement
    readonly seriesCardsElement: HTMLElement
    readonly loadMoreElement: HTMLButtonElement
}

function createSeriesCardsStageElements(): SeriesCardsStageElements {
    return {
        filterElement: createSeriesCardsFilter(),
        seriesCardsElement: createSeriesCards(),
        loadMoreElement: createLoadMore(),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent();
            stageContent.appendChild(this.filterElement);
            stageContent.appendChild(this.seriesCardsElement);
            stageContent.appendChild(this.loadMoreElement);
            
            fragment.appendChild(stageContent);
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
                }
                next();
            };
            await next();
            seriesCardsElement.appendChild(seriesCardsFragmnet);
        }
        this.checkLoadMoreComplete();
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
    state?: SeriesCardsStageProcess
}

const seriesCardsStage: SeriesCardsStage = {
    async initialise() {
        this.elements = createSeriesCardsStageElements();
        getContentStageElement().appendChild(this.elements.toFragment());
        this.state = new SeriesCardsStageProcess(this.elements);
        await this.state.freshLoad();
    }
};
export default seriesCardsStage;
