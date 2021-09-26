

export interface Filterable {
    getIdentifiers(): string[]
}

export function testFilter(filterable: Filterable, filterString: string) {
    return filterable.getIdentifiers()
                     .some((identifier) => (filterString.includes(identifier)));
}
