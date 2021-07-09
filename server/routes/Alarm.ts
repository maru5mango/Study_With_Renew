import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { IUserMethods } from '../models/User.interface';
import { Alarm } from '../models/Alarm';
import { IAlarm } from '../models/Alarm.interface';

const router = express.Router();

router.post('/NewAlarmList', (req: Request, res: Response) => {
  Alarm.find()
    .where('receivedId')
    .equals(req.body.userId)
    .where('isRead')
    .equals(false)
    .populate('senderId')
    .exec((err: Error, result: any) => {
      if (err) {
        res.send({
          success: false,
          err,
        });
      }
      res.status(200).send({
        success: true,
        result,
      });
    });
});

router.post('/MyAlarmList', (req: Request, res: Response) => {
  Alarm.find()
    .where('receivedId')
    .equals(req.body.userId)
    .populate('senderId')
    .exec((err: Error, result: any) => {
      if (err) {
        res.send({
          success: false,
          err,
        });
      }
      res.status(200).send({
        success: true,
        result,
      });
    });
});

router.post('/read', (req: Request, res: Response) => {
  Alarm.findOneAndUpdate(
    { _id: req.body.alarmId },
    { $set: { isRead: true } }
  ).exec((err: Error, doc: any) => {
    if (err) {
      res.send({
        success: false,
        err,
      });
    }
    res.status(200).send({
      success: true,
      msg: '메세지를 읽음 처리 했습니다.',
    });
  });
});

router.post('/createAlarm', (req: Request, res: Response) => {
  User.findOne(
    { nickname: req.body.receivedUserNickname },
    (err: Error, user: IUserMethods) => {
      const AlarmInfo = {
        senderId: req.body.senderId,
        receivedId: user._id,
        isRead: false,
        Contents: req.body.contents,
        type: req.body.type,
        };
        const newAlarm = new Alarm(AlarmInfo);
        newAlarm.save((err: Error | null, doc: IAlarm) => {
          if (err) {
            res.send({
              success: false,
              err,
            });
          } else {
            res.send({
              success: true,
              msg: '알람이 성공적으로 전송되었습니다.',
            });
          }
        });
    })
});

router.post('/apply', (req: Request, res: Response) => {
  const alarm = new Alarm({
    senderId: req.body.sid,
    receivedId: req.body.rid,
    isRead: false,
    Contents: req.body.contents,
    type: 2,
  });
  alarm.save((err: Error | null, doc: IAlarm) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/comment', (req: Request, res: Response) => {
  const alarm = new Alarm({
    senderId: req.body.sid,
    receivedId: req.body.rid,
    isRead: false,
    Contents: req.body.contents,
    type: 3,
  });
  alarm.save((err: Error | null, doc: IAlarm) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
