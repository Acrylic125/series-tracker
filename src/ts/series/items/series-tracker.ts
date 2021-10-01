import { Component } from "../../components/component";

export interface SeriesTracker {
    title: string
    content: SeriesTrackerContent
}

export interface SeriesTrackerContent {
    title: string
    items: SeriesTrackerContentItem[]
}

export interface SeriesTrackerContentItem<T extends HTMLElement = HTMLElement>
         extends Component<T> {
    title: string
}