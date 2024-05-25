
export enum OpfsKind {
  "Unknown",
  'Directory',
  "File"
}
export interface IOpfsEntry {
  name: string;
  handle: FileSystemHandle;
  kind: OpfsKind;
}

export interface IOpfsDirectoryEntry extends IOpfsEntry {
  name: string;
  handle: FileSystemDirectoryHandle;
  kind: OpfsKind;
}

export interface IOpfsFileEntry extends IOpfsEntry {
  name: string;
  handle: FileSystemFileHandle;
  kind: OpfsKind.File;
}

export class OfpsDirectoryEntry implements IOpfsDirectoryEntry {
  kind: OpfsKind;
  constructor(public name: string, public handle: FileSystemDirectoryHandle) {
    this.kind = OpfsKind.Directory;
  }
}

export class OfpsFileEntry implements IOpfsFileEntry {
  kind: OpfsKind.File;
  constructor(public name: string, public handle: FileSystemFileHandle) {
    this.kind = OpfsKind.File
  }
}


export class Opfs {
  private readonly _directoryHandles = new Map<string, IOpfsDirectoryEntry>;
  private readonly _fileHandles = new Map<string, IOpfsFileEntry>;

  async init(): Promise<void> {
    await this.getRoot();
  }

  async getChildren(name: string): Promise<IOpfsEntry[]> {
    const entry = this._directoryHandles.get(name);
    if (!entry)
      return [];

    const directoryHandle = entry.handle;
    const entries = [];
    for await (const [name, handle] of directoryHandle as any) {
      const h = handle as FileSystemHandle;
      let entry: IOpfsEntry;
      if (h.kind === "directory") {
        entry = new OfpsDirectoryEntry(name, handle);
        this._directoryHandles.set(entry.name, entry as OfpsDirectoryEntry);
      }
      else {
        entry = new OfpsFileEntry(name, handle);
        this._fileHandles.set(entry.name, entry as OfpsFileEntry);
      }
      
      entries.push(entry);
    }
    return entries;
  }

  async createDirectory(parent: IOpfsDirectoryEntry, name: string): Promise<IOpfsDirectoryEntry> {
    const nestedDirectoryHandle = await parent.handle.getDirectoryHandle(
      name,
      { create: true },
    );
    const entry = new OfpsDirectoryEntry(name, nestedDirectoryHandle);
    this._directoryHandles.set(entry.name, entry);
    return entry;
  }

  private async getRoot(): Promise<IOpfsDirectoryEntry> {
    const directoryHandle = await navigator.storage.getDirectory();
    const entry = new OfpsDirectoryEntry("Root", directoryHandle);
    this._directoryHandles.set(entry.name, entry);
    return entry;
  }
}