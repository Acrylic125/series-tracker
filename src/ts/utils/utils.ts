import fs from 'fs';
import { sep } from 'path';
import { Stream } from 'stream';

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function deducePath(path: string) {
    const splitPath = path.split(sep);
    const splitPathLength = splitPath.length;
    var directory = '';
    if (splitPathLength > 1) {
        for (let i = 0; i < splitPathLength - 1; i++) 
            directory += (splitPath[i] + sep);
    } 
    return {
        directory: directory,
        file: splitPath[splitPathLength - 1]
    };
}

export type FileInputType = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | Stream;

export interface FileCreationOptions {
    defaultContent: FileInputType
}

export const DEFAULT_FILE_CREATION_OPTIONS: FileCreationOptions = {
    defaultContent: ''
};
export const JSON_FILE_CREATION_OPTIONS: FileCreationOptions = {
    defaultContent: '{}'
};

export async function createFile(path: string, options: FileCreationOptions = DEFAULT_FILE_CREATION_OPTIONS) {
    var deduced = deducePath(path);
    if (deduced.directory !== '')
        await fs.promises.mkdir(deduced.directory, {
            recursive: true
        });
    await fs.promises.writeFile(path, options.defaultContent);
}

// Resolves whether a new file was created.
export function createFileIfNotExist(path: string, options: FileCreationOptions = DEFAULT_FILE_CREATION_OPTIONS) {
    const complete = new Promise<boolean>((resolve, error) => {
        fs.stat(path, async (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    await createFile(path, options);
                    resolve(true);
                } else {
                    error(err);
                }
            } else {
                resolve(false);
            }
        });
    });
    return complete;
}

export function toComparableString(str: string) {
    return str.toLocaleLowerCase();
}

export function toID(id: string) {
    return id.toLocaleLowerCase();
}

export function parseFloatOrUndefined(val: string | undefined) {
    return parseFloatOrDefault(val, 0);
}

export function parseFloatOrDefault<T>(val: string | undefined, defaultVal: T): number | T {
    return (val) ? parseFloat(val) : defaultVal;
}

export function undefinedOrDefault<T>(val: T | undefined, defaultVal: T) {
    return (val === undefined || val === null) ? defaultVal : val;
}

export function clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
}

export function removeElementFromArray<T>(array: T[], element: T) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

export function isIndexOutOfBoundsOfArray<T>(array: T[], index: number) {
    return index < 0 || index >= array.length;
}

export function swapElementInArray<T>(array: T[], swapFromIndex: number, swapToIndex: number) {
    if (swapFromIndex === swapToIndex || isIndexOutOfBoundsOfArray(array, swapFromIndex) || isIndexOutOfBoundsOfArray(array, swapToIndex))
        return;
    const itemFrom = array[swapFromIndex],
          itemTo = array[swapToIndex];
    array[swapFromIndex] = itemTo;
    array[swapToIndex] = itemFrom;
}

/**
 * Shifting Left <----
 * Example:
 * array = ['a', 'b', 'c', 'd', 'e']
 * If the 3rd index element is shifted left then
 * array -> ['a', 'c', 'b', 'd', 'e']
 * 
 * If wrap is true, then if 0th index element is shifted, 
 * it will become the last element. Otherwise, it will not shift.
 */
export function shifElementtLeftByIndex<T>(array: T[], index: number, wrap = true) {
    var swapIndex = index - 1;
    if (index === 0) {
        if (!wrap)
            return;
        swapIndex = array.length - 1;
    }
    swapElementInArray(array, index, swapIndex);
}

export function shifElementtLeft<T>(array: T[], element: T, wrap = true) {
    const index = array.indexOf(element);
    if (index <= -1)
        return;
    shifElementtLeftByIndex(array, index, wrap);
}

/**
 * Shifting Right ---->
 * Example:
 * array = ['a', 'b', 'c', 'd', 'e']
 * If the 3rd index element is shifted right then
 * array -> ['a', 'b', 'd', 'c', 'e']
 * 
 * If wrap is true, then if last element is shifted, 
 * it will become the 0th element. Otherwise, it will not shift.
 */
 export function shifElementtRightByIndex<T>(array: T[], index: number, wrap = true) {
    var swapIndex = index + 1;
    if (index === array.length - 1) {
        if (!wrap)
            return;
        swapIndex = 0;
    }
    swapElementInArray(array, index, swapIndex);
}

export function shifElementtRight<T>(array: T[], element: T, wrap = true) {
    const index = array.indexOf(element);
    if (index <= -1)
        return;
    shifElementtRightByIndex(array, index, wrap);
}