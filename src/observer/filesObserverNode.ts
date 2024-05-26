
export enum FileObserverNodeType {
  File,
  Directory
}
export interface IFileObserverNode {
  id: string;
  name: string;
  modified?: string;
  size?: string;
  type: FileObserverNodeType;
}