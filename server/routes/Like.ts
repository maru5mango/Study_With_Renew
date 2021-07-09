import express, { Request, Response } from 'express';
import Like from '../models/Like';
import { Project } from '../models/Project';
import { User } from '../models/User';

const router = express.Router();

// 프로젝트를 좋아요한 유저
router.post('/projectLikeUsers', (req: Request, res: Response) => {
  Like.find({ ProjectId: req.body.id })
    .populate('SenduserId')
    .exec((error, users) => {
      if (error) {
        return res.status(400).send(error);
      }
      res.status(200).json({
        success: true,
        users,
      });
    });
});

// 로그인 유저가 좋아요한 유저
router.post('/myLikeUsers', (req: Request, res: Response) => {
  Like.find({
    $and: [{ SenduserId: req.body.id }, { RecieveduserId: { $exists: true } }],
  })
    .populate('RecieveduserId')
    .exec((error, users) => {
      if (error) {
        return res.status(400).send(error);
      }
      res.status(200).json({
        success: true,
        users,
      });
    });
});

// 로그인 유저가 좋아요한 프로젝트
router.post('/myLikeProjects', (req: Request, res: Response) => {
  // const data = {
  //   $exists: true,
  // }
  Like.find({
    $and: [{ SenduserId: req.body.id }, { ProjectId: { $exists: true } }],
  })
    .populate('ProjectId')
    .exec((error, projects) => {
      if (error) {
        return res.status(400).send(error);
      }
      res.status(200).json({
        success: true,
        projects,
      });
    });
});

// 좋아요가 있는 프로젝트
router.get('/getLikeProjects', (req: Request, res: Response) => {
  Like.find({ ProjectId: { $exists: true } }).exec((error, likes) => {
    if (error) {
      return res.status(400).send(error);
    }
    res.status(200).json({
      success: true,
      likes,
    });
  });
});

// 좋아요가 있는 유저
router.get('/getLikeUsers', (req: Request, res: Response) => {
  Like.find({ RecieveduserId: { $exists: true } }).exec((error, likes) => {
    if (error) {
      return res.status(400).send(error);
    }
    res.status(200).json({
      success: true,
      likes,
    });
  });
});

// 좋아요 +1
router.post('/upLike', (req: Request, res: Response) => {
  let data = {};

  if (req.body.projectId) {
    data = {
      ProjectId: req.body.projectId,
      SenduserId: req.body.userId,
    };
  } else {
    data = {
      RecieveduserId: req.body.recieveduserId,
      SenduserId: req.body.userId,
    };
  }

  const like = new Like(data);

  like.save((error, result) => {
    if (error) {
      return res.status(400).send(error);
    }

    if (req.body.projectId) {
      Project.findOneAndUpdate(
        { _id: req.body.projectId },
        { $inc: { receivedLike: 1 } }
      ).exec((error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.status(200).json({
          success: true,
        });
      });
    } else {
      User.findOneAndUpdate(
        { _id: req.body.recieveduserId },
        { $inc: { receivedLike: 1 } }
      ).exec((error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.status(200).json({
          success: true,
        });
      });
    }
  });
});

// 좋아요 -1
router.post('/unLike', (req: Request, res: Response) => {
  let data = {};

  if (req.body.projectId) {
    data = {
      ProjectId: req.body.projectId,
      SenduserId: req.body.userId,
    };
  } else {
    data = {
      RecieveduserId: req.body.recieveduserId,
      SenduserId: req.body.userId,
    };
  }

  Like.findOneAndDelete(data).exec((error, result) => {
    if (error) {
      return res.status(400).send(error);
    }
    if (req.body.projectId) {
      Project.findOneAndUpdate(
        { _id: req.body.projectId },
        { $inc: { receivedLike: -1 } }
      ).exec((error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.status(200).json({
          success: true,
        });
      });
    } else {
      User.findOneAndUpdate(
        { _id: req.body.recieveduserId },
        { $inc: { receivedLike: -1 } }
      ).exec((error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.status(200).json({
          success: true,
        });
      });
    }
  });
});

module.exports = router;
