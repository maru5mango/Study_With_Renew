import { Document, Schema } from 'mongoose';

export interface IUserRole extends Document {
  projectId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  role: Number;
  msg?: string;
}
