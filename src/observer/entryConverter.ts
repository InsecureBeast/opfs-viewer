import { IOpfsEntry, OpfsKind } from "../opfs/opfsReader";
import { FileObserverNodeType, IFileObserverNode } from "./filesObserverNode";

export class OpfsEntryConverter {

  static toObserverNode(entry: IOpfsEntry): IFileObserverNode {
    const item: IFileObserverNode = {
      id: this.randomString(),
      modified: new Date(Date.now()),
      name: entry.name,
      size: entry.kind === OpfsKind.Directory ?  0: Math.random() * 100,
      type: entry.kind === OpfsKind.Directory ?  FileObserverNodeType.Directory : FileObserverNodeType.File
    };
    return item;
  }

  private static randomString(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}