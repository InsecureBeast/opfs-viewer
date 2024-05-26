
export interface MessageRequest {
  message: string;
  data: unknown;
}

export interface MessageResponse {
  data: unknown;
}

export enum Messages {
  GetChildren = 'getChildren',
  Init = 'init'
}