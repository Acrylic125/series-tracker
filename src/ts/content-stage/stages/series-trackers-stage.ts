import { ActionButton, createColorLine, createColumns, createHorzCenteredActionButton } from '../../components/global-components';
import { Series } from '../../series/series';
import { ContentStage } from '../content-stage';

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

interface SeriesTrackersElements {
    readonly gridColumns: HTMLElement[]
    readonly addSeriesTracker: HTMLElement
    readonly colorLine: HTMLElement
    toFragment(): DocumentFragment
}

function createSeriesTrackersElements(): SeriesTrackersElements {
    return {
        gridColumns: createColumns(2),
        colorLine: createColorLine('#ff4123'),
        addSeriesTracker: createAddSeriesTrackerButton(),
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

interface SeriessStage extends ContentStage {
    elements?: SeriesTrackersElements
}

export function createSeriesStage(series: Series): ContentStage {
    return {
        async initialise() {
            // this.elements = createSeriesCardsStageElements();
            // getContentStageElement().appendChild(this.elements.toFragment());
            // this.state = new SeriesCardsStageProcess(this.elements);
            // await this.state.freshLoad();
        }
    };
}