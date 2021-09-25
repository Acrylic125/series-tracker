import SeriesItem from './items/series-item';

export interface Series {
    title: string
    id: string
    tags: string[] // Tag IDs
    items: SeriesItem[]
    colorStripColor: string
}
