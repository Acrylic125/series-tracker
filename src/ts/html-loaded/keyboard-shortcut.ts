export interface KeyboardShortcut {
    keys: string[]
    callback(): void
}

export class KeyboardShortcutListener {
    private currentKeysPressed = new Set<string>();
    private preparedForNextCycle = true;
    private keyboardCallback = async (event: KeyboardEvent) => {
        this.currentKeysPressed.add(event.key);
        if (this.preparedForNextCycle)
            setTimeout(() => this.activateCycle(), 100);
    };

    constructor(public shortcuts = new Array<KeyboardShortcut>()) {}

    public reload() {
        document.removeEventListener('keydown', this.keyboardCallback);
        document.addEventListener('keydown', this.keyboardCallback);
    }

    private doesShortcutMatch(shortcut: KeyboardShortcut) {
        for (const key of shortcut.keys) {
            if (!this.currentKeysPressed.has(key))
                return false;
        }
        return true;
    }

    public async activateCycle() {
        this.shortcuts.forEach((shortcut) => 
            this.doesShortcutMatch(shortcut) && shortcut.callback());
        this.currentKeysPressed = new Set();
        this.preparedForNextCycle = false;
    }

}

export const keyboardShortcutListener = new KeyboardShortcutListener();