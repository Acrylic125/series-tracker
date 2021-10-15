export const KEY_SHIFT = 'shift';
export const KEY_ALT = 'shift';
export const KEY_CTRL = 'ctrl';
 
export interface KeyboardShortcut {
    keys: string[]
    callback(): void
}

export class KeyboardShortcutListener {
    private currentKeysPressed = new Set<string>();
    private preparedForNextCycle = true;
    private keyboardCallback = async (event: KeyboardEvent) => {
        this.currentKeysPressed.add(event.key);
        if (event.shiftKey) this.currentKeysPressed.add(KEY_SHIFT);
        if (event.ctrlKey) this.currentKeysPressed.add(KEY_CTRL);
        if (event.altKey) this.currentKeysPressed.add(KEY_ALT);
        if (this.preparedForNextCycle) {
            this.preparedForNextCycle = false;
            setTimeout(() => this.activateCycle(), 350);
        }
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
        this.preparedForNextCycle = true;
    }

}

export const keyboardShortcutListener = new KeyboardShortcutListener();