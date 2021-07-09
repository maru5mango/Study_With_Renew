import { postSignup as apiCall, IMyInfo, IResponse } from '../api/auth';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { RootState } from '.';

const POST_SIGNUP = 'signup/POST_SIGNUP' as const;
const POST_SIGNUP_SUCCESS = 'signup/POST_SIGNUP_SUCCESS' as const;
const POST_SIGNUP_ERROR = 'signup/POST_SIGNUP_ERROR' as const;

export const postSignup = () => ({
  type: POST_SIGNUP,
});

export const postSignupSuccess = (data: IResponse) => ({
  type: POST_SIGNUP_SUCCESS,
  payload: data,
});

export const postSignupError = (data: AxiosError) => ({
  type: POST_SIGNUP_ERROR,
  payload: data,
});

type SignupAction =
  | ReturnType<typeof postSignup>
  | ReturnType<typeof postSignupSuccess>
  | ReturnType<typeof postSignupError>;

type SignupState = {
  signup: {
    loading: boolean;
    data: IResponse | null;
    error: Error | null;
  };
};

export function postSignupThunk(
  info: IMyInfo
): ThunkAction<Promise<void>, RootState, null, SignupAction> {
  return async (dispatch) => {
    dispatch(postSignup());
    try {
      const response = await apiCall(info);
      dispatch(postSignupSuccess(response));
    } catch (error) {
      dispatch(postSignupError(error));
    }
  };
}

const initialState: SignupState = {
  signup: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function signup(
  state: SignupState = initialState,
  action: SignupAction
): SignupState {
  switch (action.type) {
    case POST_SIGNUP:
      return {
        ...state,
        signup: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case POST_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case POST_SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
