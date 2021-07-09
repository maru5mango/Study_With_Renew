//json-server 실행 필요(client 폴더 진입 후): npx json-server ./data.json --port 5000
import axios from 'axios';
import { USER_SERVER } from '../Config';

//추후에 배포 시 localhost를 서버 주소로 변경
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:5000';

export async function getUsersInfo(nickname: string): Promise<IUsers> {
  const response = await axios.get<IUsers>(`${USER_SERVER}/show/${nickname}`);
  return response.data;
}

export async function getProjectList(nickname: string): Promise<IProjectInfo> {
  const response = await axios.get<IProjectInfo>(
    `${USER_SERVER}/show/projectList/${nickname}`
  );
  return response.data;
}

export interface IUsers {
  success: boolean;
  user: IUser;
}

export interface IUser {
  avartarImg?: string;
  nickname: string;
  email: string;
  tel?: string;
  position: string;
  positionLevel: string;
  availableLocation?: string;
  availableWeek?: string;
  availableTime?: string;
  interestSkills?: string[];
  intro?: string;
  portfolio?: string[];
  receivedLike: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProjectInfo {
  success: boolean;
  data: Array<IProject>;
}

export interface IProject {
  position: Array<IPos>;
  referenceURL: Array<string>;
  _id: string;
  title: string;
  thumb: string;
  info: string;
  summary: string;
  field: string;
  area: string;
  startAt: Date;
  endAt: Date;
  projectLV: string;
  receivedLike: number;
  writer: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IPos {
  pos: string;
  required: number;
  current: number;
}
