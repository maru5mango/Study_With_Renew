import { IUser } from '.';

export interface IAlarmRequest {
  senderId: string | null;
  contents: string;
  receivedUserNickname: string;
  type: number;
}

export interface IGetMyAlarm {
  success: boolean;
  result: Array<IAlarm>;
}

export interface IAlarm {
  _id: string;
  Contents: string;
  createdAt: Date;
  isRead: boolean;
  receivedId: string;
  senderId: IUser;
  type: 0 | 1 | 2 | 3;
}

export interface IAlarmResponse {
  msg: string;
  success: boolean;
}
