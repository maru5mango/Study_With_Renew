import mongoose, { Schema, Model } from 'mongoose';
import { ILike } from './Like.interface';

const LikeSchema: mongoose.Schema<ILike> = new Schema(
  {
    RecieveduserId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    SenduserId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    ProjectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
  },
  {
    timestamps: true,
  }
);

export const Like: Model<ILike> = mongoose.model('like', LikeSchema);

export default Like;
