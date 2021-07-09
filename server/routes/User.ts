import express, { request, Request, response, Response } from 'express';
const router = express.Router();
const { User } = require('../models/User');
import { IUserMethods } from '../models/User.interface';
import { auth } from '../middleware/auth.middleware';
import UserRole from '../models/UserRole';
import filterAsync from 'node-filter-async';
const { LOCAL_HOST } = require('../../client/src/Config');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, 'uploads/users');
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('profileImg');

async function isJoin(_id: any) {
  const result = await UserRole.find().where('userId').equals(_id);
  if (result.length > 0) {
    return true;
  }
}

async function filterById(id: any) {
  if (await isJoin(id)) {
    return true;
  }
  return false;
}

//api/users?loc=A0&pos=frontend&UserState=1&page=1
//지역 필터/ 직무 필터/ 프로젝트 참여 여부
// 프로젝트 참여 여부는 UserRole에서 찾아야 함. id가 userRole에 있으면 참여중, 없으면 미참여중
router.get('/', (req: Request, res: Response) => {
  const page = typeof req.query.page === 'string' ? req.query.page : '1';
  const LocFilter = req.query.loc;
  const PosFilter = req.query.pos;
  const skip = (parseInt(page) - 1) * 10;
  const limit = 10;

  const UserStateFilter =
    req.query.UserState === '1' ? 1 : req.query.UserState === '2' ? 2 : 0;
  let filterarg: any = {};
  if (LocFilter) {
    filterarg['availableLocation'] = LocFilter;
  }
  if (PosFilter) {
    filterarg['position'] = PosFilter;
  }
  User.find(filterarg)
    .skip(skip)
    .limit(limit)

    .exec(async (err: Error, userList: Array<IUserMethods>) => {
      if (err) {
        return res.json({
          success: false,
          err,
        });
      }

      if (UserStateFilter === 1) {
        if (userList.length === 0) {
          return res.json({
            success: true,
            page,
            user: userList,
          });
        }
        const data = await filterAsync(
          userList,
          async (value: any, index: number) => {
            return await filterById(value._id);
          }
        );
        res.status(200).json({
          success: true,
          page,
          user: data,
        });
      }
      if (UserStateFilter === 2) {
        if (userList.length === 0) {
          return res.json({
            success: true,
            page,
            user: userList,
          });
        }
        const data = await filterAsync(
          userList,
          async (value: any, index: number) => {
            return !(await filterById(value._id));
          }
        );
        res.status(200).json({
          success: true,
          page,
          user: data,
        });
      } else {
        res.status(200).json({
          success: true,
          page,
          filterarg,
          user: userList,
        });
      }
    });
});

router.get('/new', (req: Request, res: Response) => {
  User.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .exec((err: Error, users: IUserMethods) => {
      if (err) {
        return res.status(404).send(err);
      }
      res.status(200).json({
        users,
      });
    });
});

router.get('/waitList', (req: Request, res: Response) => {
  User.find()
    .limit(3)
    .exec(async (err: Error, users: Array<IUserMethods>) => {
      const data = await filterAsync(
        users,
        async (value: any, index: number) => {
          return !(await filterById(value._id));
        }
      );
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({
        users: data,
      });
    });
});

router.get('/recommend', (req: Request, res: Response) => {
  User.find()
    .sort({ receivedLike: -1 })
    .limit(6)
    .exec((err: Error, user: IUserMethods) => {
      if (err) {
        return res.json({
          success: false,
          err,
        });
      }
      res.status(200).json({
        success: true,
        user,
      });
    });
});

router.get('/show/:id', (req: Request, res: Response) => {
  const reqNickname = req.params.id;
  User.findOne({ nickname: reqNickname }, (err: Error, user: IUserMethods) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({
      success: true,
      user,
    });
  });
});

//사용자가 참여중인(팀장 포함) 프로젝트가 있는지 찾기
router.get('/show/projectList/:id', (req: Request, res: Response) => {
  const reqNickname = req.params.id;
  User.findOne({ nickname: reqNickname }, (err: Error, user: IUserMethods) => {
    if (err) {
      return res.json({ success: false, err });
    }
    if (!user) {
      res.json({
        success: true,
        data: [''],
      });
    } else {
      UserRole.find()
        .where('userId')
        .equals(user._id)
        .where('role')
        .equals(0)
        .populate('projectId')
        .exec((err: Error, result: any) => {
          const data = result.map((item: any) => {
            return item.projectId;
          });
          res.json({
            user: user._id,
            data,
          });
        });
    }
  });
});

router.post('/nickname', (req: Request, res: Response) => {
  User.findOne(
    { nickname: req.body.nickname },
    (err: Error, user: IUserMethods) => {
      if (err) {
        return res.json({ success: false, err });
      }
      if (user != null) {
        res.json({
          success: false,
        });
      } else {
        res.status(200).json({
          success: true,
          nickname: req.body.nickname,
        });
      }
    }
  );
});

router.post('/signup', (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err: Error | null, doc: IUserMethods) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      user: doc,
    });
  });
});

router.post('/login', (req: Request, res: Response) => {
  //구글, github 로그인 => profileObj의 email로 회원정보 확인
  User.findOne({ email: req.body.email }, (err: Error, user: IUserMethods) => {
    if (!user) {
      return res.json({
        Success: false,
        error: 'email not found',
      });
    }
    if (err) {
      return res.json({ success: false, err });
    }
    user.generateToken((err: Error, user: IUserMethods) => {
      if (err) return res.status(400).send(err);
      res.cookie('U_auth', user.token).status(200).json({
        success: true,
        userId: user._id,
      });
    });
  });
});

router.post('/info', (req: Request, res: Response) => {
  User.findOne({ _id: req.body._id }, (err: Error, user: IUserMethods) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
  });
});

router.post('/update', (req: Request, res: Response) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    User(req.body),
    (err: Error, user: IUserMethods) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
  );
});

router.post('/updateImg', (req: Request, res: Response) => {
  upload(req, res, (err: Error) => {
    if (err) {
      return res.json({ success: false, err });
    }
    if (req.file) {
      return res.status(200).json({
        success: true,
        filePath: `${LOCAL_HOST}/${req.file.path}`,
      });
    } else {
      return res.status(200).json({
        success: true,
        filePath: req.body.avartarImg,
      });
    }
  });
});

router.get('/auth', auth, (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      _id: req.user._id,
      isAuth: true,
      email: req.user.email,
      name: req.user.nickname,
      avartarImg: req.user.avartarImg ? req.user.avartarImg : 'none',
    });
  }
});

router.get('/logout', auth, (req: Request, res: Response) => {
  if (req.user) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' },
      { rawResult: true },
      (err: Error, doc: any) => {
        if (err)
          return res.json({
            success: false,
            err,
          });
        return res.clearCookie('U_auth').status(200).send({
          success: true,
        });
      }
    );
  }
});

module.exports = router;
