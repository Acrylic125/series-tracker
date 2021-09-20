import SeriesItem from './series-item';

export interface SeriesItemCollection extends SeriesItem {
    items: Array<SeriesItem>
}