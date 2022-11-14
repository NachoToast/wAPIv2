import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

export default class Database<T> {
    /** Full name of folder inside the root `data` directory, e.g. "users" or "subfolder/users". */
    public readonly fileName: string;

    /** `data` joined with the file name. */
    private readonly _filePath: string;

    /** Function to get filename from an object. Must return a unique identifier. */
    private readonly _indexFunction: (item: T) => string;

    public get size(): number {
        return readdirSync(this._filePath, 'utf-8').length;
    }

    /**
     * @param {String} fileName Full name of the folder inside the root `data` directory, e.g. "users" or
     * "subfolder/users".
     */
    public constructor(filename: string, indexFunction: (item: T) => string) {
        this.fileName = filename;
        this._indexFunction = indexFunction;

        this._filePath = join('data', filename);

        if (!existsSync(this._filePath)) {
            mkdirSync(this._filePath, { recursive: true });
        }
    }

    /** Adds or updates an entry in the database. */
    public set(item: T): void {
        writeFileSync(
            join(this._filePath, `${encodeURIComponent(this._indexFunction(item))}.json`),
            JSON.stringify(item),
            'utf-8',
        );
    }

    public get(id: string): T | null {
        try {
            return JSON.parse(readFileSync(join(this._filePath, `${encodeURIComponent(id)}.json`), 'utf-8'));
        } catch (error) {
            return null;
        }
    }

    public has(id: string): boolean {
        return existsSync(join(this._filePath, `${encodeURIComponent(id)}.json`));
    }

    /** Removes an entry from the database, will return false if entry does not exist. */
    public delete(id: string): boolean {
        try {
            rmSync(join(this._filePath, `${encodeURIComponent(id)}.json`));
            return true;
        } catch (error) {
            return false;
        }
    }

    public getAllKeys(): string[] {
        return readdirSync(this._filePath, 'utf-8').map((e) => decodeURIComponent(e.slice(0, -5)));
    }

    public getAllValues(): T[] {
        const allItems = this.getAllKeys();
        const len = allItems.length;

        const output = new Array<T>(len);
        for (let i = 0; i < len; i++) {
            const fileId = allItems[i];
            output[i] = this.get(fileId)!;
        }

        return output;
    }
}
