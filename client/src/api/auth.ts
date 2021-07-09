import axios from 'axios';
import { USER_SERVER } from '../Config';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:5000';

export async function getLogout(): Promise<IResponse> {
  const response = await axios.get<IResponse>(`${USER_SERVER}/logout`);
  return response.data;
}
export async function getAuth(): Promise<IResponse> {
  const response = await axios.get<IResponse>(`${USER_SERVER}/auth`);
  return response.data;
}
export async function postSignup(info: IMyInfo): Promise<IResponse> {
  const response = await axios.post<IResponse>(`${USER_SERVER}/signup`, info);
  return response.data;
}
export async function postLogin(info: IMyInfo): Promise<IResponse> {
  const response = await axios.post<IResponse>(`${USER_SERVER}/login`, info);
  return response.data;
}

export interface IResponse {
  isAuth: boolean;
  error: string;
  success: boolean;
  _id: string;
  email: string;
  name: string;
  avartarImg: string;
}

export interface IMyInfo {
  email: string;
}
