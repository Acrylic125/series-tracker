import { ActionButton, bindRightClickMenu, createBoundedStageContent, createColorLine, createColumn, createColumns, createDivWithClasses, createHorzCenteredActionButton, createInnerText } from '../../components/global-components';
import { createSeriesTrackerComponent, createSeriesTrackerStageTitle, SeriesTrackerComponent } from '../../components/series-tracker/series-tracker-components';
import { createTrackerWithEpisodesTemplate, Series, SeriesTracker, SeriesTrackerID } from '../../series/series';
import { removeElementFromArray, shifElementtLeft, shifElementtRight, undefinedOrDefault } from '../../utils/utils';
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
        const tracker = createTrackerWithEpisodesTemplate('', {});
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
    private trackerComponentMap: Map<SeriesTrackerID, SeriesTrackerComponent> = new Map();

    constructor(public series: Series) {
        this.columns.forEach((column) => this.element.appendChild(column));
    }

    public addColumn(columns = 1) {
        for (let i = 0; i < columns; i++) 
            this.columns.push(createColumn());
    }

    public clearDisplayed() {
        this.currentColumn = 0;
        this.columns.forEach((column) => 
            column.innerText = '');
    }

    public clearAll() {
        this.clearDisplayed();
        this.trackerComponentMap = new Map();
    }

    private appendElement(elemenet: HTMLElement) {
        const columns = this.columns;
        columns[this.currentColumn++ % columns.length].appendChild(elemenet);
    }

    public async appendTracker(tracker: SeriesTracker, hot = false) {
        const refresh = async () => this.hotRefreshTrackers();
        var seriesTrackerComponent;
        if (hot) {
            var componentFromMap = this.trackerComponentMap.get(tracker.id);
            seriesTrackerComponent = (componentFromMap) ? componentFromMap : createSeriesTrackerComponent(tracker);
        } else 
            seriesTrackerComponent = createSeriesTrackerComponent(tracker);
        this.trackerComponentMap.set(tracker.id, seriesTrackerComponent);
        
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
                        displayer.trackerComponentMap.delete(tracker.id);
                        removeElementFromArray(displayer.series.trackers, tracker);
                        refresh();
                    }
                },
                {
                    text: "Shift Left",
                    onClick() {
                        shifElementtLeft(displayer.series.trackers, tracker);
                        refresh();
                    }
                },
                {
                    text: "Shift Right",
                    onClick() {
                        shifElementtRight(displayer.series.trackers, tracker);
                        refresh();
                    }
                },
            ]
        });
        this.appendElement(seriesTrackerComponent.seriesTrackerElement);
    }

    public async hotRefreshTrackers() {
        this.clearDisplayed();
        this.series.trackers.forEach((tracker) => this.appendTracker(tracker, true));
    }

    public async refreshTrackers() {
        this.clearAll();
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
                  { dynamicElement, heightAsText } = createSeriesTrackerStageTitle(series.title, () => {
                    series.title = undefinedOrDefault(heightAsText.value, 'No Title');
                  });
            
            this.seriesTrackersDisplayer.refreshTrackers();
            // Append elements to stageContent
            stageContent.appendChild(dynamicElement);
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