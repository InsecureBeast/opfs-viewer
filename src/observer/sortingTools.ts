import { INode } from "./INode";

export function sortByNodeType(a: INode, b: INode): number {
  if (a.type === b.type)
    return a.name.localeCompare(b.name);
  return b.type - a.type;
}