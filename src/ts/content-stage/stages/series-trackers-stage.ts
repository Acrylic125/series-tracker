import { clear } from 'console';
import { ActionButton, bindRightClickMenu, createBoundedStageContent, createColorLine, createColumn, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTrackerComponent, createSeriesTrackerStageTitle } from '../../components/series-tracker/series-tracker-components';
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
    addSeriesTracker.onclick = () => {
        seriesTrackers.series.trackers.push(createTracker('No Title', {}));
        seriesTrackers.update();
    };
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

    private addElement(elemenet: HTMLElement) {
        const columns = this.columns;
        columns[this.currentColumn++ % columns.length].appendChild(elemenet);
    }

    public async update() {
        this.clear();
        const update = async () => this.update();
        const trackers = this;
        this.series.trackers.forEach(addTracker);

        async function addTracker(tracker: SeriesTracker) {
            const seriesTrackerComponent = createSeriesTrackerComponent(tracker);
            bindRightClickMenu(seriesTrackerComponent.seriesTrackerElement, {
            buttons: [
                {
                    text: "Edit",
                    onClick: seriesTrackerComponent.openModal
                },
                {
                    text: "Delete",
                    onClick() {
                        removeElementFromArray(trackers.series.trackers, tracker);
                        update();
                    }
                },
            ]})
            trackers.addElement(seriesTrackerComponent.seriesTrackerElement);
        }
    }

}

function createSeriesTrackerStageElements(series: Series): SeriesTrackerStageElements {
    const seriesTrackers = new SeriesTrackers(series);
    return {
        seriesTrackers,
        colorLine: createColorLine(series.colorStripColor),
        addSeriesTracker: createAddSeriesTrackerButton(seriesTrackers),
        toFragment() {
            const fragment = new DocumentFragment(),
                  stageContent = createBoundedStageContent(),
                  titleELement = createSeriesTrackerStageTitle(series.title);
            
            this.seriesTrackers.update();
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