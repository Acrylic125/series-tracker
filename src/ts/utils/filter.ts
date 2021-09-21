

export interface Filterable {
    getIdentifiers(): string[]
}

export function containFilter(filterables: Array<Filterable>, filterString: string) {
    for (const filterable of filterables) {
        if (filterable.getIdentifiers()
                      .some((identifier) => (filterString.includes(identifier)))) 
            return true;
    }
    return false;
}