
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

  async getRoots(): Promise<IOpfsEntry[]> {
    const directoryHandle = await navigator.storage.getDirectory();
    const entries = [];
    for await (const [name, handle] of directoryHandle as any) {
      const h = handle as FileSystemHandle;
      let entry: IOpfsEntry;
      if (h.kind === "directory")
        entry = new OfpsDirectoryEntry(name, handle);
      else
        entry = new OfpsFileEntry(name, handle);
      
      entries.push(entry);
    }
    return entries;
  }

  async getRoot(): Promise<IOpfsDirectoryEntry> {
    const directoryHandle = await navigator.storage.getDirectory();
    const entry = new OfpsDirectoryEntry("/", directoryHandle);
    return entry;
  }

  async createDirectory(parent: IOpfsDirectoryEntry, name: string): Promise<IOpfsDirectoryEntry> {
    const nestedDirectoryHandle = await parent.handle.getDirectoryHandle(
      name,
      { create: true },
    );
    const entry = new OfpsDirectoryEntry(name, nestedDirectoryHandle);
    return entry;
  }
}