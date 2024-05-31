
export interface IMessageRequest {
  message: string;
  data: unknown;
}

export interface IMessageResponse {
  data: unknown;
}

export enum Messages {
  GetChildren = 'getChildren',
  Init = 'init',
  Delete = 'delete',
  Rename = 'rename',
  CheckSecureContext = 'checkSecureContext'
}

export interface IRenameMessageData {
  path: string;
  newName: string; 
}