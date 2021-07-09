import mongoose from 'mongoose';
import { IUser, IUserMethods, IUserModel } from './User.interface';

const jwt = require('jsonwebtoken');

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    avartarImg: String,
    nickname: {
      type: String,
      required: 'Nickname is required.',
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: 'Email is required.',
      trim: true,
      unique: true,
    },
    tel: {
      type: String,
      trim: true,
    },
    position: String,
    positionLevel: String,
    availableLocation: {
      type: String,
      default: 'A0',
    },
    availableWeek: String,
    availableTime: String,
    interestSkills: [String],
    token: String,
    receivedLike: {
      type: Number,
      default: 0,
    },
    portfolio: [String],
    intro: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function (cb: Function) {
  this.token = jwt.sign(this._id.toHexString(), 'secret');
  this.save((err: Error | null, user: IUser) => {
    cb(err, user);
  });
};

userSchema.statics.findByToken = function (token: string, cb: Function) {
  jwt.verify(token, 'secret', (err: Error | null, decode?: object) => {
    this.findOne(
      { _id: decode, token: token },
      (err: Error, user: IUserMethods) => {
        cb(err, user);
      }
    );
  });
};

export const User: IUserModel = mongoose.model<IUserMethods, IUserModel>(
  'user',
  userSchema
);

export default User;
