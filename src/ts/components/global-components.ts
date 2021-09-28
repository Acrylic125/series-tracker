const TAG = 'tag';

//  <li class="series-card__tag"> </li>
export function createTag(tagName: string) {
    const tagElement = document.createElement('li');
    tagElement.classList.add(TAG);
    tagElement.innerText = tagName;
    return tagElement;
}