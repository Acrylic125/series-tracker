export interface AsyncLoaderCallback<T> {
    (loadedValue: T): void
}

export class AsyncLoader<T> {

    public loaded = false;
    private loadedValue?: T;
    private callbacks: AsyncLoaderCallback<T>[] = [];
 
    constructor(supplier: () => Promise<T>) {
        (async () => {
            const value = await supplier();
            this.loadedValue = value;
            this.loaded = true;
            if (value)
                this.callbacks.forEach((callback) => callback(value));
            this.callbacks = [];
        })();
    }

    public call(callback: AsyncLoaderCallback<T>) {
        if (this.loaded) {
            if (this.loadedValue)
                callback(this.loadedValue);
        } else {
            this.callbacks.push(callback);
        }
    }

    
}