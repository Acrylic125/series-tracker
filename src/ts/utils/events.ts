import { type } from "process";

export type EventID = string;

export interface Event<T extends EventID> {
    id: T
}

export interface EventListener<T extends EventID,
                               E extends Event<T> = Event<T>> {
    (event: E): void
}

export class EventHandler {
    private listenersMap: Map<EventID, EventListener<EventID>[]> = new Map();
    
    public getListeners<T extends EventID>(id: T): EventListener<T>[] {
        var listeners = this.listenersMap.get(id);
        if (listeners)
            return listeners;
        listeners = [];
        this.listenersMap.set(id, listeners);
        return listeners;
    }

    public addListener<T extends EventID>(id: T, listener: EventListener<T, Event<T>>) {
        const listeners = this.getListeners(id);
        listeners.push(listener);
    }

    public addListeners<T extends EventID>(id: T, ...listeners: EventListener<T, Event<T>>[]) {
        const retrievedListeners = this.getListeners(id);
        listeners.forEach((listener) => retrievedListeners.push(listener));
    }

    public dispatchEvent<T extends EventID>(event: Event<T>) {
        const id = event.id;
        var listeners = this.listenersMap.get(id);
        if (listeners) 
            listeners.forEach((listener) => listener(event));
    }
}


