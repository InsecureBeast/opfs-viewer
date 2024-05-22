
export enum ObserverNodeType {
  File,
  Directory
}
export interface IObserverNode {
  name: string;
  modified: Date;
  type: ObserverNodeType;
}