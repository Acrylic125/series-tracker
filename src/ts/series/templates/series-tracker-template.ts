// No generic type used to determine data type of template.
// This is due to deserialisation and unknown data being provided.
export interface SeriesTrackerTemplate {
    id: string
    decorate(trackerModalContent: HTMLElement, templateData: any): void
}