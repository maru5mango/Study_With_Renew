import { postLogin as apiCall, IMyInfo, IResponse } from '../api/auth';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { RootState } from '.';

const POST_LOGIN = 'login/POST_LOGIN' as const;
const POST_LOGIN_SUCCESS = 'login/POST_LOGIN_SUCCESS' as const;
const POST_LOGIN_ERROR = 'login/POST_LOGIN_ERROR' as const;

export const postLogin = () => ({
  type: POST_LOGIN,
});

export const postLoginSuccess = (data: IResponse) => ({
  type: POST_LOGIN_SUCCESS,
  payload: data,
});

export const postLoginError = (data: AxiosError) => ({
  type: POST_LOGIN_ERROR,
  payload: data,
});

type LoginAction =
  | ReturnType<typeof postLogin>
  | ReturnType<typeof postLoginSuccess>
  | ReturnType<typeof postLoginError>;

type LoginState = {
  login: {
    loading: boolean;
    data: IResponse | null;
    error: Error | null;
  };
};

export function postLoginThunk(
  info: IMyInfo
): ThunkAction<Promise<void>, RootState, null, LoginAction> {
  return async (dispatch) => {
    dispatch(postLogin());
    try {
      const response = await apiCall(info);
      dispatch(postLoginSuccess(response));
    } catch (error) {
      dispatch(postLoginError(error));
    }
  };
}

const initialState: LoginState = {
  login: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function login(
  state: LoginState = initialState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        login: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case POST_LOGIN_ERROR:
      return {
        ...state,
        login: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
