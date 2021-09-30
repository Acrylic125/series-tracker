import { Series } from '../../series/series';
import { ContentStage } from '../content-stage';

interface SeriesElements {
    columnState: number
    readonly gridColumns: HTMLElement[]
    readonly createSeriesTracker: HTMLElement
    readonly colorLine: HTMLElement
    addToColumn(element: HTMLElement): void
    toFragment(): DocumentFragment
}

interface SeriessStage extends ContentStage {
    elements?: SeriesElements
}

export function createSeriesStage(series: Series): ContentStage {
    return {
        async initialise() {
            this.elements = createSeriesCardsStageElements();
            getContentStageElement().appendChild(this.elements.toFragment());
            this.state = new SeriesCardsStageProcess(this.elements);
            await this.state.freshLoad();
        }
    };
}