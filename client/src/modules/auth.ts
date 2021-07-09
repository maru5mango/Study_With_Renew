import { getAuth as apiCall, IResponse } from '../api/auth';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { RootState } from '.';

const GET_AUTH = 'auth/GET_AUTH' as const;
const GET_AUTH_SUCCESS = 'auth/GET_AUTH_SUCCESS' as const;
const GET_AUTH_ERROR = 'auth/GET_AUTH_ERROR' as const;

export const getAuth = () => ({
  type: GET_AUTH,
});

export const getAuthSuccess = (data: IResponse) => ({
  type: GET_AUTH_SUCCESS,
  payload: data,
});

export const getAuthError = (error: any) => ({
  type: GET_AUTH_ERROR,
  payload: error,
});

type AuthAction =
  | ReturnType<typeof getAuth>
  | ReturnType<typeof getAuthSuccess>
  | ReturnType<typeof getAuthError>;

export type AuthState = {
  auth: {
    loading: boolean;
    data: IResponse | null;
    error: Error | null;
  };
};

export function getAuthThunk(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AuthAction
> {
  return async (dispatch) => {
    dispatch(getAuth());
    try {
      const response = await apiCall();
      dispatch(getAuthSuccess(response));
    } catch (error) {
      dispatch(getAuthError(error));
    }
  };
}

const initialState: AuthState = {
  auth: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function auth(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        auth: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        auth: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        auth: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
