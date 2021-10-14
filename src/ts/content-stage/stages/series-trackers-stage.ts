import { clear } from 'console';
import { ActionButton, bindRightClickMenu, createBoundedStageContent, createColorLine, createColumn, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTrackerComponent, createSeriesTrackerStageTitle } from '../../components/series-tracker/series-tracker-components';
import { createTrackerModalDisplayer } from '../../components/series-tracker/series-tracker-modal';
import { createTracker, Series, SeriesTracker } from '../../series/series';
import { removeElementFromArray } from '../../utils/utils';
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

function createAddSeriesTrackerButton(seriesTrackersDisplayer: SeriesTrackersDisplayer) {
    const addSeriesTracker = createHorzCenteredActionButton(addSeriesTrackerButton);
    addSeriesTracker.classList.add('create-series-tracker');
    addSeriesTracker.onclick = () => {
        const tracker = createTracker('No Title', {});
        seriesTrackersDisplayer.series.trackers.push(tracker);
        seriesTrackersDisplayer.appendTracker(tracker);
    };
    return addSeriesTracker;
}

interface SeriesTrackerStageElements extends ContentStageElements {
    readonly seriesTrackersDisplayer: SeriesTrackersDisplayer
    readonly addSeriesTracker: HTMLElement
    readonly colorLine: HTMLElement
}

export class SeriesTrackersDisplayer {
    public element: HTMLElement = createDivWithClasses('series-trackers');
    private columns: HTMLElement[] = createColumns(2);
    private currentColumn = 0;

    constructor(public series: Series) {
        this.columns.forEach((column) => this.element.appendChild(column));
    }

    public addColumn(columns = 1) {
        for (let i = 0; i < columns; i++) 
            this.columns.push(createColumn());
    }

    public clear() {
        this.currentColumn = 0;
        this.columns.forEach((column) => 
            column.innerText = '');
    }

    private appendElement(elemenet: HTMLElement) {
        const columns = this.columns;
        columns[this.currentColumn++ % columns.length].appendChild(elemenet);
    }

    public async appendTracker(tracker: SeriesTracker) {
        const refresh = async () => this.refreshTrackers();
        const seriesTrackerComponent = createSeriesTrackerComponent(tracker);
        const displayer = this;
        bindRightClickMenu(seriesTrackerComponent.seriesTrackerElement, {
            buttons: [
                {
                    text: "Edit",
                    onClick: seriesTrackerComponent.openModal
                },
                {
                    text: "Delete",
                    onClick() {
                        removeElementFromArray(displayer.series.trackers, tracker);
                        refresh();
                    }
                },
            ]
        });
        displayer.appendElement(seriesTrackerComponent.seriesTrackerElement);
    }

    public async refreshTrackers() {
        this.clear();
        this.series.trackers.forEach((tracker) => this.appendTracker(tracker));
    }

}

function createSeriesTrackerStageElements(series: Series): SeriesTrackerStageElements {
    const seriesTrackersDisplayer = new SeriesTrackersDisplayer(series);
    return {
        seriesTrackersDisplayer,
        colorLine: createColorLine(series.colorStripColor),
        addSeriesTracker: createAddSeriesTrackerButton(seriesTrackersDisplayer),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent(),
                  titleELement = createSeriesTrackerStageTitle(series.title);
            
            this.seriesTrackersDisplayer.refreshTrackers();
            // Initialise event listeners
            titleELement.addEventListener('input', () => 
                series.title = titleELement.value);
            
            // Append elements to stageContent
            stageContent.appendChild(titleELement);
            stageContent.appendChild(this.colorLine);
            stageContent.appendChild(createAddSeriesTrackerButton(this.seriesTrackersDisplayer));
            stageContent.appendChild(this.seriesTrackersDisplayer.element);
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