import { Date, Document, Schema } from 'mongoose';

export interface Ipos {
  pos: string;
  required: number;
  current: number;
}

export interface IProject extends Document {
  title: string;
  thumb: string;
  info: string;
  summary: string;
  field: string;
  area: string;
  position: Array<Ipos>;
  referenceURL: Array<String>;
  startAt: Date;
  endAt: Date;
  writer: Schema.Types.ObjectId;
  projectLV: string;
  receivedLike: number;
  createdAt: string;
}
