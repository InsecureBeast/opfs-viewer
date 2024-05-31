import { v4 as uuidv4 } from 'uuid';
import { IOpfsEntry, IOpfsFileEntry, OpfsKind } from "../opfs/opfs";
import { NodeType, INode } from "./INode";

export class OpfsEntryConverter {

  static toviewerNode(entry: IOpfsEntry): INode {
    const item: INode = {
      id: uuidv4(),
      name: entry.name,
      type: entry.kind === OpfsKind.Directory ?  NodeType.Directory : NodeType.File
    };

    if (entry.kind === OpfsKind.File) {
      const fileEntry = entry as IOpfsFileEntry;
      const dateStr = new Date(fileEntry.modified)
        .toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })
      item.modified = dateStr;
      item.size = this.convertSize(fileEntry.size);
    }
    return item;
  }

  private static randomString(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private static convertSize(sizeInBytes: number): string {
    if (sizeInBytes >= 1073741824) { // 1 GB
        return `${(sizeInBytes / 1073741824).toFixed(2)} GB`;
    } else if (sizeInBytes >= 1048576) { // 1 MB
        return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
    } else {
        return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    }
}
}