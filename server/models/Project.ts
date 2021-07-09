import mongoose, { Schema, Model } from 'mongoose';
import { IProject } from './Project.interface';

const ProjectSchema: mongoose.Schema<IProject> = new Schema(
  {
    title: String,
    thumb: String,
    info: String,
    summary: String,
    field: String,
    area: String,
    position: Array,
    referenceURL: Array,
    startAt: Date,
    endAt: Date,
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    projectLV: String,
    receivedLike: Number,
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> = mongoose.model(
  'project',
  ProjectSchema
);

export default Project;
