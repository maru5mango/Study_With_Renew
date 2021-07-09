import mongoose, { Schema, Model } from 'mongoose';
import { IAlarm } from './Alarm.interface';

const AlarmSchema: mongoose.Schema<IAlarm> = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    receivedId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isRead: Boolean,
    Contents: String,
    type: Number,
  },
  {
    timestamps: true,
  }
);

export const Alarm: Model<IAlarm> = mongoose.model('alarm', AlarmSchema);

export default Alarm;
