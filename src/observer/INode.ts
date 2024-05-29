
export enum NodeType {
  File,
  Directory
}
export interface INode {
  id: string;
  name: string;
  modified?: string;
  size?: string;
  type: NodeType;
}