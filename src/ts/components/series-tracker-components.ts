
/**
 *          <div class="series-tracker">
              <div class="series-tracker__bg rel-0">
                <div class="series-tracker__bg--circle"></div>
              </div>
              <article class="series-tracker__content">
                <header>Seasons</header>
                <ol>
                  <li>
                    <p class="series-tracker__content-item--title">Season 1</p>
                    <p class="series-tracker__content-item--status">Episode 24</p>
                  </li>
                </ol>
              </article>
            </div>
 */

// <header> </header>
export function createSeriesTrackerTitle(title: string) {
    const titleElement = document.createElement('header');
    titleElement.innerText = title;
    return titleElement;
}

export type ContentItemCallback = (contentItem: HTMLElement) => void;

export interface ContentItem {
    title?: string
    callback?: ContentItemCallback
}

// <p class="series-tracker__content-item--title"> </p>
export function createSeriesTrackerContentItemTitle(title: string) {
    const titleElement = document.createElement('p');
    titleElement.innerText = title;
    titleElement.classList.add('series-tracker__content-item--title');
    return titleElement;
}

// <p class="series-tracker__content-item--status"> </p>
export function createSeriesTrackerContentItemStatus(status: string) {
    const titleElement = document.createElement('p');
    titleElement.innerText = status;
    titleElement.classList.add('series-tracker__content-item--status');
    return titleElement;
}

// <li>
//   <p class="series-tracker__content-item--title"> </p>
// </li>
export function createSeriesTrackerContentItem(contentItem: ContentItem) {
    const contentItemElement = document.createElement('li');
    const { title, callback } = contentItem;
    if (title)
        contentItemElement.appendChild(createSeriesTrackerContentItemTitle(title));
    if (callback) 
        callback(contentItemElement);
    return contentItemElement;
}

export interface SeriesTrackerContent {
    title?: string
    contentItems?: ContentItem[]
}

export function createSeriesTrackerContent(seriesTrackerContent: SeriesTrackerContent) {
    const { title, contentItems } = seriesTrackerContent;
    const contentElement = document.createElement('article');
    contentElement.classList.add('series-tracker__content');
    if (title) 
        contentElement.appendChild(createSeriesTrackerTitle(title));
    const contentItemsElement = document.createElement('ul');
    if (contentItems) 
        contentItems.forEach((contentItem) => 
            contentItemsElement.appendChild(createSeriesTrackerContentItem(contentItem))
        );
    return contentElement;
}