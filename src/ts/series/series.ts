import SeriesItem from './items/series-item';

export interface Series {
    title: string
    id: string
    items: SeriesItem[]
    colorStripColor: string
}
