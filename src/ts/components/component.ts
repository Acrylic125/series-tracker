
export interface Component {
    toHTML(): string
}

export interface SerializableComponent<M = any> {
    serialize(): M
}