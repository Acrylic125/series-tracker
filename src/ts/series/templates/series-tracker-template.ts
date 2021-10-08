export interface SeriesTrackerTemplate {
    id: string
    decorate(trackerModalContent: HTMLElement, templateData: any): void
}