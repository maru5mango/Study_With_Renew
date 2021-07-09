import { Document, Schema } from 'mongoose';

export interface IAlarm extends Document {
  senderId: Schema.Types.ObjectId;
  receivedId: Schema.Types.ObjectId;
  isRead: boolean;
  Contents: string;
  type: number;
}
