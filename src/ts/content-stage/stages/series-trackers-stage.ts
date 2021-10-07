import { ActionButton, createBoundedStageContent, createColorLine, createColumn, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTracker } from '../../components/series-tracker/series-tracker-components';
import { Series, SeriesTracker } from '../../series/series';
import { ContentStageElements, FragmentedContentStage } from '../content-stage';
import { getContentStageElement } from '../content-stage-manager';

const addSeriesTrackerButton: ActionButton = {
    tooltip: {
        title: "Add Series Tracker",
        text: "Click to add series tracker, to track what this series has to offer."
    },
    innerText: '\u002B',
    circular: false,
    singular: true
}

function createAddSeriesTrackerButton() {
    const addSeriesTracker = createHorzCenteredActionButton(addSeriesTrackerButton);
    addSeriesTracker.classList.add('create-series-tracker');
    return addSeriesTracker;
}

interface SeriesTrackerStageElements extends ContentStageElements {
    readonly seriesTrackers: SeriesTrackers
    readonly addSeriesTracker: HTMLElement
    readonly colorLine: HTMLElement
}

export class SeriesTrackers {
    public element: HTMLElement = createDivWithClasses('series-trackers');
    private columns: HTMLElement[] = createColumns(2);
    private currentColumn = 0;

    constructor() {
        this.columns.forEach((column) => this.element.appendChild(column));
    }

    public addColumn(columns = 1) {
        for (let i = 0; i < columns; i++) 
            this.columns.push(createColumn());
    }

    private addElement(elemenet: HTMLElement) {
        const columns = this.columns;
        var col = this.currentColumn++;
        if (col >= columns.length) {
            col = 0;
            this.currentColumn = 1;
        }
        columns[col].appendChild(elemenet);
    }

    public addSeriesTracker(seriesTracker: SeriesTracker) {
        this.addElement(createSeriesTracker(seriesTracker));
    }

    public addSeries(series: Series) {
        series.trackers.forEach((tracker) => this.addSeriesTracker(tracker));
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
            this.seriesTrackers.addSeries(series);
            stageContent.appendChild(createInnerText('h1', series.title));
            stageContent.appendChild(this.colorLine);
            stageContent.appendChild(createAddSeriesTrackerButton());
            stageContent.appendChild(this.seriesTrackers.element);
            fragment.appendChild(stageContent);
            return fragment;
        }
    }
}

export function createSeriesStage(series: Series): FragmentedContentStage<SeriesTrackerStageElements> {
    return {
        async initialise() {
            this.elements = createSeriesTrackerStageElements(series);
            getContentStageElement().appendChild(this.elements.toFragment());
        }
    };
}