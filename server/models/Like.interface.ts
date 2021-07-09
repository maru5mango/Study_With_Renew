import { Date, Document, Schema } from 'mongoose';

export interface ILike extends Document {
  RecieveduserId?: string;
  SenduserId: string;
  ProjectId?: string;
}
