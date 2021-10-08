import { toID } from "./utils";

export interface Registry<K, T> {
    register(key: K, t: T): void
    unregister(key: K): void
    get(key: K): T | undefined
}

export class RegistryImpl<T> implements Registry<string, T> {
    constructor(private registry: Map<string, T> = new Map()) {}

    public register(key: string, t: T) {
        this.registry.set(toID(key), t);
    }

    public unregister(key: string) {
        this.registry.delete(toID(key));
    }

    public get(key: string) {
        return this.registry.get(toID(key));
    } 

}