import { Filterable } from '../utils/filter';
import SeriesItem from './items/series-item';

export interface Series extends Filterable {
    title: string
    id: string
    tags: string[] // Tag IDs
    items: SeriesItem[]
    colorStripColor: string
}
