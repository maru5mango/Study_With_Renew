import mongoose, { Schema, Model } from 'mongoose';
import { IComment } from './Commet.interface';

const CommentSchema: mongoose.Schema<IComment> = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export const Comment: Model<IComment> = mongoose.model(
  'comment',
  CommentSchema
);

export default Comment;
