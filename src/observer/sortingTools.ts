import { IFileObserverNode } from "./filesObserverNode";

export function sortByNodeType(a: IFileObserverNode, b: IFileObserverNode): number {
  if (a.type === b.type)
    return a.name.localeCompare(b.name);
  return b.type - a.type;
}