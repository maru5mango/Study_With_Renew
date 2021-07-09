import mongoose, { Schema, Model } from 'mongoose';
import { IUserRole } from './UserRole.interface';

const userRoleSchema: mongoose.Schema<IUserRole> = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    role: Number,
    msg: String,
  },
  {
    timestamps: true,
  }
);

export const UserRole: Model<IUserRole> = mongoose.model(
  'user_role',
  userRoleSchema
);

export default UserRole;
