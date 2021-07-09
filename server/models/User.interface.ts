import { Date, Document, Model } from 'mongoose';

export interface IUser extends Document {
  avartarImg: string;
  nickname: string;
  email: string;
  position: string;
  positionLevel: string;
  availableLocation: string;
  availableWeek: string;
  availableTime: string;
  interestSkills: string[];
  token: string;
  receivedLike: number;
  createdAt: Date;
  updatedAt: Date;
  tel?: string;
  portfolio?: string[];
  intro?: string;
}

export interface IUserMethods extends IUser {
  generateToken: (cb: Function) => Function;
}

export interface IUserModel extends Model<IUserMethods> {
  findByToken: (token: string, cb: Function) => void;
}
