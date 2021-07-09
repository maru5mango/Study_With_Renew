import express, { Request, Response } from 'express';
const { User } = require('../models/User');
import { IUserMethods } from '../models/User.interface';
const { Comment } = require('../models/Comment');
import { IComment } from '../models/Commet.interface';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {});

router.post('/', (req: Request, res: Response) => {
  const cmt = new Comment(req.body);
  cmt.save((err: Error | null, comment: IComment) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, comment });
  });
});

router.post('/remove', (req: Request, res: Response) => {
  Comment.deleteOne(req.body, (err: Error, cmt: IComment) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get('/:pid', (req: Request, res: Response) => {
  Comment.find({ projectId: req.params.pid })
    .sort({ createdAt: -1 })
    .exec((err: Error, comments: IComment[]) => {
      if (err) return res.json({ success: false, err });
      Promise.all(comments.map((cmt) => User.findOne({ _id: cmt.writer })))
        .then((results) => {
          const mappedResults = results.map((user, idx) => ({
            nickname: user.nickname,
            avartarImg: user.avartarImg,
            createdAt: comments[idx].createdAt,
            content: comments[idx].content,
          }));
          return res.status(200).json({ success: true, result: mappedResults });
        })
        .catch((err) => {
          return res.json({ success: false, err });
        });
    });
});

module.exports = router;
