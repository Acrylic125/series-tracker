import { clear } from 'console';
import { ActionButton, bindRightClickMenu, createBoundedStageContent, createColorLine, createColumn, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTracker, createSeriesTrackerStageTitle } from '../../components/series-tracker/series-tracker-components';
import { createTrackerModal } from '../../components/series-tracker/series-tracker-modal';
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

function createAddSeriesTrackerButton(seriesTrackers: SeriesTrackers) {
    const addSeriesTracker = createHorzCenteredActionButton(addSeriesTrackerButton);
    addSeriesTracker.classList.add('create-series-tracker');
    addSeriesTracker.onclick = () => 
        seriesTrackers.addSeriesTracker(createTracker('No Title', {}));
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

    public clear() {
        this.columns.forEach((column) => 
            column.innerText = '');
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

    public addSeriesTracker(trackers: SeriesTracker[], seriesTracker: SeriesTracker) {
        const addSeriesTrackerCallback = () => this.addSeriesTrackers(trackers);
        const clearCallback = () => this.clear();
        
        const seriesTrackerElement = createSeriesTracker(seriesTracker);
        bindRightClickMenu(seriesTrackerElement.seriesTrackerElement, {
            buttons: [
              {
                text: "Edit",
                onClick: seriesTrackerElement.openModal
              },
              {
                text: "Delete",
                onClick() {
                    removeElementFromArray(trackers, seriesTracker);
                    clearCallback();
                    addSeriesTrackerCallback();
                }
              },
            ]
          })
        this.addElement(seriesTrackerElement.seriesTrackerElement);
    }

    public addSeriesTrackers(trackers: SeriesTracker[]) {
        trackers.forEach((tracker) => this.addSeriesTracker(trackers, tracker));
    }

    public addSeriesTrackersBySeries(series: Series) {
        this.addSeriesTrackers(series.trackers);
    }

}

function createSeriesTrackerStageElements(series: Series): SeriesTrackerStageElements {
    const seriesTrackers = new SeriesTrackers();
    return {
        seriesTrackers,
        colorLine: createColorLine(series.colorStripColor),
        addSeriesTracker: createAddSeriesTrackerButton(seriesTrackers),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent(),
                  titleELement = createSeriesTrackerStageTitle(series.title);
            
            this.seriesTrackers.addSeriesTrackersBySeries(series);
            // Initialise event listeners
            titleELement.addEventListener('input', () => 
                series.title = titleELement.value);
            
            // Append elements to stageContent
            stageContent.appendChild(titleELement);
            stageContent.appendChild(this.colorLine);
            stageContent.appendChild(createAddSeriesTrackerButton(this.seriesTrackers));
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