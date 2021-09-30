
/**
 *          <div class="series-tracker-group">
              <div class="series-tracker-group__bg rel-0">
                <div class="series-tracker-group__bg--circle"></div>
              </div>
              <article class="series-tracker-group__content">
                <header>Seasons</header>
                <ol>
                  <li>
                    <p class="series-tracker-group__content-item--title">Season 1</p>
                    <p class="series-tracker-group__content-item--status">Episode 24</p>
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

// <p class="series-tracker-group__content-item--title"> </p>
export function createSeriesTrackerContentTitleItem(title: string) {
    const titleElement = document.createElement('p');
    titleElement.innerText = title;
    titleElement.classList.add('series-tracker-group__content-item--title');
    return titleElement;
}

// <p class="series-tracker-group__content-item--status"> </p>
export function createSeriesTrackerContentStatusItem(status: string) {
    const titleElement = document.createElement('p');
    titleElement.innerText = status;
    titleElement.classList.add('series-tracker-group__content-item--status');
    return titleElement;
}

// <li>
//   <p class="series-tracker-group__content-item--title"> </p>
// </li>
export function createSeriesTrackerContentItem(title: string) {
    const contentElement = document.createElement('li');
    contentElement.appendChild(createSeriesTrackerContentTitleItem(title));
    return contentElement;
}