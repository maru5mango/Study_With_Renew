import { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  writer: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}
