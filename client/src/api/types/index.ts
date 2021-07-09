export interface IUser {
  _id: string;
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

export interface ILike {
  RecieveduserId?: string;
  SenduserId: string;
  ProjectId?: string;
}

export interface IMyLikeProject {
  ProjectId: IProject;
}

export interface IMyLikeUser {
  RecieveduserId: IUser;
  SenduserId: IUser;
}
