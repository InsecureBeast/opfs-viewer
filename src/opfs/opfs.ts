import { IRenameMessageData } from "src/data/messages";

export enum OpfsKind {
  "Unknown",
  'Directory',
  "File"
}
export interface IOpfsEntry {
  name: string;
  kind: OpfsKind;
}

export interface IOpfsDirectoryEntry extends IOpfsEntry {
  name: string;
  kind: OpfsKind;
}

export interface IOpfsFileEntry extends IOpfsEntry {
  name: string;
  kind: OpfsKind.File;
  modified: number;
  size: number;
}

export class OfpsDirectoryEntry implements IOpfsDirectoryEntry {
  kind: OpfsKind;
  constructor(public name: string) {
    this.kind = OpfsKind.Directory;
  }
}

export class OfpsFileEntry implements IOpfsFileEntry {
  kind: OpfsKind.File;
  constructor(public name: string, public modified: number, public size: number) {
    this.kind = OpfsKind.File
  }
}

export class Opfs {
  private readonly _directoryHandles = new Map<string, FileSystemDirectoryHandle>;
  private readonly _fileHandles = new Map<string, FileSystemFileHandle>;
  isInit = false;

  async init(): Promise<void> {
    await this.getRoot();  
    this.isInit = true;
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async getChildren(name: string): Promise<IOpfsEntry[]> {
    this.checkInitialize();

    const directoryHandle = this._directoryHandles.get(name);
    if (!directoryHandle)
      return [];

    const entries = [];
    for await (const [name, handle] of directoryHandle as any) {
      const h = handle as FileSystemHandle;
      let entry: IOpfsEntry;
      if (h.kind === "directory") {
        entry = new OfpsDirectoryEntry(name);
        this._directoryHandles.set(entry.name, handle);
      }
      else {
        const file = await (<FileSystemFileHandle>h).getFile();
        entry = new OfpsFileEntry(name, file.lastModified, file.size);
        this._fileHandles.set(entry.name, handle);
      }
      
      entries.push(entry);
    }
    return entries;
  }

  async createDirectory(parent: string, name: string): Promise<IOpfsDirectoryEntry> {
    this.checkInitialize();
    
    const directoryHandle = this.getParentHandle(parent);
    const nestedDirectoryHandle = await directoryHandle.getDirectoryHandle(
      name,
      { create: true },
    );
    const entry = new OfpsDirectoryEntry(name);
    this._directoryHandles.set(entry.name, nestedDirectoryHandle);
    return entry;
  }

  async createFile(parent: string, name: string): Promise<IOpfsFileEntry> {
    this.checkInitialize();

    const directoryHandle = this.getParentHandle(parent);
    const nestedDirectoryHandle = await directoryHandle.getFileHandle(
      name,
      { create: true },
    );
    const file = await nestedDirectoryHandle.getFile();
    const entry = new OfpsFileEntry(name, file.lastModified, file.size);
    this._fileHandles.set(entry.name, nestedDirectoryHandle);
    return entry;
  }

  rename(data: IRenameMessageData): Promise<void> {
    this.checkInitialize();

    console.log(data);
    return Promise.resolve();
  }

  async delete(filename: string): Promise<void> {
    this.checkInitialize();

    const split = filename.split("/");
    split.shift();
    let directoryHandle = await navigator.storage.getDirectory();
    for (let index = 0; index < split.length; index++) {
      const element = split[index];
      if (index === split.length - 1) {
        await directoryHandle.removeEntry(element, {recursive: true})
        return;
      }
      directoryHandle = await directoryHandle.getDirectoryHandle(element);
    }
  }

  private async getRoot(): Promise<IOpfsDirectoryEntry> {
    const directoryHandle = await navigator.storage.getDirectory();
    const entry = new OfpsDirectoryEntry("Root");
    this._directoryHandles.set(entry.name, directoryHandle);
    return entry;
  }


  private getParentHandle(name: string): FileSystemDirectoryHandle {
    const directoryHandle = this._directoryHandles.get(name);
    if (!directoryHandle)
      throw new Error("Parent not found");

    return directoryHandle;
  }

  private checkInitialize(): void {
    if (!this.isInit)
      throw new Error("Opfs is not initialized");
  }
}