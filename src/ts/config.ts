import fs from 'fs';

interface StorageConfiguration {
    autoSave?: boolean,
    autoSaveInterval: number 
    type: string
    path: string
}

interface ShortcutsConfiguration {
    enabled: boolean
    activationCycleDelay: number
}

interface Configuration {
    storage: StorageConfiguration
    shortcuts: ShortcutsConfiguration
}

