import fs, { mkdir } from 'fs';
import { sep } from 'path';
import { Stream } from 'stream';

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const RED_HEX = 2 << 15;
export const GREEN_HEX = 2 << 7;
export const BLUE_HEX = 1;

export function rgbToDec(r: number, g: number, b: number) {
    return (r * RED_HEX) + (g * GREEN_HEX) + b; 
}

export function rgbToHex(r: number, g: number, b: number) {
    return rgbToDec(r, g, b).toString(16);
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