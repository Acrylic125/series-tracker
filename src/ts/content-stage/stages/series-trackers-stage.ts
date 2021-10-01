import { ActionButton, createBoundedStageContent, createColorLine, createColumns, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { Series } from '../../series/series';
import { ContentStageElements, FragmentedContentStage } from '../content-stage';

const addSeriesTrackerButton: ActionButton = {
    tooltip: {
        title: "Add Series Tracker",
        text: "Click to add series tracker, to track what this series has to offer."
    },
    innerText: '\u002B',
    circular: true,
    singular: true
}

function createAddSeriesTrackerButton() {
    return createHorzCenteredActionButton(addSeriesTrackerButton);
}

interface SeriesTrackerStageElements extends ContentStageElements {
    readonly seriesTrackers: SeriesTrackers
    readonly addSeriesTracker: HTMLElement
    readonly colorLine: HTMLElement
}

interface SeriesTrackers {
    columns: HTMLElement[]
}

function createSeriesTrackerStageElements(series: Series): SeriesTrackerStageElements {
    return {
        gridColumns: createColumns(2),
        colorLine: createColorLine(series.colorStripColor),
        addSeriesTracker: createAddSeriesTrackerButton(),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent();
            stageContent.appendChild(createInnerText('h1', series.title));
            stageContent.appendChild(this.colorLine);
            stageContent.appendChild(this.loadMoreElement);

            fragment.appendChild(stageContent);
            return fragment;
        }
    }
}


export function createSeriesStage(series: Series): FragmentedContentStage<SeriesTrackersElements> {
    return {
        async initialise() {
            // this.elements = createSeriesCardsStageElements();
            // getContentStageElement().appendChild(this.elements.toFragment());
            // this.state = new SeriesCardsStageProcess(this.elements);
            // await this.state.freshLoad();
        }
    };
}