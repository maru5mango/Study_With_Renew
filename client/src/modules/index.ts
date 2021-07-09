import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import logout from './logout';
import signup from './signup';
import login from './login';
import getUser from './userInfo';
import homeReducer from './home';
import LikeReducer from './like';

const rootReducer = combineReducers({
  auth,
  logout,
  signup,
  login,
  user: getUser,
  home: homeReducer,
  like: LikeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
