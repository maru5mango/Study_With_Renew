import express, { Request, Response } from 'express';
const { Like } = require('../models/Like');
import { ILike } from '../models/Like.interface';
const { Project } = require('../models/Project');
import { IProject } from '../models/Project.interface';
const { UserRole } = require('../models/UserRole');
import { IUserRole } from '../models/UserRole.interface';
const router = express.Router();

router.post('/find', (req: Request, res: Response) => {
  UserRole.findOne(
    { projectId: req.body.pid, userId: req.body.uid },
    (err: Error, role: IUserRole) => {
      if (err) return res.json({ success: false, err });
      let msg = '';
      switch (role?.role) {
        case 0:
          msg = '이미 해당 프로젝트의 리더입니다';
          break;
        case 1:
          msg = '이미 해당 프로젝트의 멤버입니다';
          break;
        case 2:
          msg = '이미 해당 프로젝트에 지원했습니다';
          break;
      }
      return res.json({ success: true, msg });
    }
  );
});

router.post('/join', (req: Request, res: Response) => {
  const userRole = new UserRole({
    projectId: req.body.pid,
    userId: req.body.uid,
    role: 2,
    msg: req.body.msg,
  });
  userRole.save((err: Error | null, doc: IUserRole) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/accept', (req: Request, res: Response) => {
  Project.findOne({ _id: req.body.pid }, (err: Error, prj: IProject) => {
    if (err) {
      return res.json({ success: false, err });
    }
    let isFull = false;
    prj.position = prj.position.map((item) => {
      if (item.pos === req.body.pos) {
        if (item.current < item.required) item.current += 1;
        else isFull = true;
      }
      return item;
    });
    if (isFull) {
      return res.json({ success: false, err: '모집 인원이 다 찼습니다' });
    }
    Project.findOneAndUpdate(
      { _id: req.body.pid },
      { $set: { position: prj.position } },
      (err: Error, prev: IProject) => {
        if (err) return res.json({ success: false, err });
        UserRole.findOneAndUpdate(
          {
            projectId: req.body.pid,
            userId: req.body.uid,
            role: 2,
          },
          { $set: { role: 1 } },
          (err: Error, userRole: IUserRole) => {
            if (err) {
              return res.json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
            });
          }
        );
      }
    );
  });
});

router.post('/reject', (req: Request, res: Response) => {
  UserRole.deleteOne(
    { projectId: req.body.pid, userId: req.body.uid, role: 2 },
    (err: Error, userRole: IUserRole) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    }
  );
});

router.post('/remove', (req: Request, res: Response) => {
  Project.findOne({ _id: req.body.pid }, (err: Error, prj: IProject) => {
    if (err) {
      return res.json({ success: false, err });
    }
    let isEmpty = false;
    prj.position = prj.position.map((item) => {
      if (item.pos === req.body.pos) {
        if (item.current > 0) item.current -= 1;
        else isEmpty = true;
      }
      return item;
    });
    if (isEmpty) {
      return res.json({ success: false, err: '더 이상 삭제할 수 없습니다' });
    }
    Project.findOneAndUpdate(
      { _id: req.body.pid },
      { $set: { position: prj.position } },
      (err: Error, prev: IProject) => {
        if (err) return res.json({ success: false, err });
        UserRole.deleteOne(
          { projectId: req.body.pid, userId: req.body.uid, role: 1 },
          (err: Error, userRole: IUserRole) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
              success: true,
            });
          }
        );
      }
    );
  });
});

router.post('/updateProject', (req: Request, res: Response) => {
  Project.findOneAndUpdate(
    { _id: req.body._id },
    Project(req.body),
    (err: Error, project: IProject) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        project: project,
      });
    }
  );
});

router.post('/deleteProject', (req: Request, res: Response) => {
  UserRole.deleteMany(
    { projectId: req.body.pid },
    (err: Error, userRole: IUserRole) => {
      if (err) {
        return res.json({ success: false, err });
      }
      Project.deleteOne(
        { _id: req.body.pid },
        (err: Error, project: IProject) => {
          if (err) {
            return res.json({ success: false, err });
          }
          Like.deleteMany(
            { ProjectId: req.body.pid },
            (err: Error, like: ILike) => {
              if (err) {
                return res.json({ success: false, err });
              }
              return res.status(200).json({
                success: true,
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
