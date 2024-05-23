import { IFileObserverNode } from "./filesObserverNode";

export function sortByNodeType(a: IFileObserverNode, b: IFileObserverNode): number {
  return b.type - a.type;
}