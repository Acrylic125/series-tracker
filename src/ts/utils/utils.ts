import fs, { mkdir } from 'fs';
import { sep } from 'path';

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
        for (let i = 0; i < length - 1; i++) 
            directory += (splitPath[i] + sep);
    } 
    return {
        directory: directory,
        file: splitPath[splitPathLength - 1]
    };
}

export async function createFile(path: string) {
    var deduced = deducePath(path);
    console.log("dir: " + deduced.directory);
    if (deduced.directory !== '')
        await fs.promises.mkdir(deduced.directory);
    await fs.promises.writeFile(path, '');
}

// Resolves whether a new file was created.
export function createFileIfNotExist(path: string) {
    const complete = new Promise<boolean>((resolve, error) => {
        fs.stat(path, async (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    await createFile(path);
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

(async function create() {
    createFileIfNotExist('./hello.txt')
})();