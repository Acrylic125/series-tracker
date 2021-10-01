export interface Component<T extends HTMLElement = HTMLElement> {
    toComponent(): T
}