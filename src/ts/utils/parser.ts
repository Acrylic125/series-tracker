export interface Parser<T> {
    parse(data: any): T
}
