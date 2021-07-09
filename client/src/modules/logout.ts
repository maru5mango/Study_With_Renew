import { getLogout as apiCall, IResponse } from '../api/auth';
import { ThunkAction } from 'redux-thunk';
import { AxiosError } from 'axios';
import { RootState } from '.';

const GET_LOGOUT = 'logout/GET_LOGOUT' as const;
const GET_LOGOUT_SUCCESS = 'logout/GET_LOGOUT_SUCCESS' as const;
const GET_LOGOUT_ERROR = 'logout/GET_LOGOUT_ERROR' as const;

export const getLogout = () => ({
  type: GET_LOGOUT,
});

export const getLogoutSuccess = (data: IResponse) => ({
  type: GET_LOGOUT_SUCCESS,
  payload: data,
});

export const getLogoutError = (error: AxiosError) => ({
  type: GET_LOGOUT_ERROR,
  payload: error,
});

type LogoutAction =
  | ReturnType<typeof getLogout>
  | ReturnType<typeof getLogoutSuccess>
  | ReturnType<typeof getLogoutError>;

export type LogoutState = {
  logout: {
    loading: boolean;
    data: IResponse | null;
    error: Error | null;
  };
};

export function getLogoutThunk(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  LogoutAction
> {
  return async (dispatch) => {
    dispatch(getLogout());
    try {
      const response = await apiCall();
      dispatch(getLogoutSuccess(response));
    } catch (error) {
      dispatch(getLogoutError(error));
    }
  };
}

const initialState: LogoutState = {
  logout: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function logout(
  state: LogoutState = initialState,
  action: LogoutAction
): LogoutState {
  switch (action.type) {
    case GET_LOGOUT:
      return {
        ...state,
        logout: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_LOGOUT_ERROR:
      return {
        ...state,
        logout: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
