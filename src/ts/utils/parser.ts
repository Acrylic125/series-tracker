export interface Parser<T> {
    id: string
    parse(data: any): T
}
