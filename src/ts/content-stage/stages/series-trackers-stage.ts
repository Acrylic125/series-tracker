import { ActionButton, createBoundedStageContent, createColorLine, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTracker } from '../../components/series-tracker-components';
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

export class SeriesTrackers {
    public columns: HTMLElement[] = createColumns(2);
    public element: HTMLElement = createDivWithClasses('series-trackers');
    private currentColumn = 0;

    private addElement(elemenet: HTMLElement) {
        const columns = this.columns;
        var col = this.currentColumn++;
        if (col >= columns.length) 
            col = 0;
        columns[col].appendChild(elemenet);
    }

    public addSeriesTracker(series: Series) {
        this.addElement(createSeriesTracker(series.title, {
            
        }));
    }

}

function createSeriesTrackerStageElements(series: Series): SeriesTrackerStageElements {
    return {
        seriesTrackers: new SeriesTrackers(),
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