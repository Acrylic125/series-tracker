import SeriesItem from "./series-item";
import ElementCover from '../../covers/element-cover';

export default interface SeriesType extends SeriesItem {
    name: string,
    link?: string,
    icon: ElementCover,
    background: ElementCover
}