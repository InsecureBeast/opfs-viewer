
export enum FileObserverNodeType {
  File,
  Directory
}
export interface IFileObserverNode {
  id: string;
  name: string;
  modified: Date;
  size: number;
  type: FileObserverNodeType;
}