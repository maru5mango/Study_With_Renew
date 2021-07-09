import axios from 'axios';
import { ALARM_SERVER } from '../Config';
import { IAlarmRequest, IGetMyAlarm, IAlarmResponse } from './types/alarm';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:5000';

export async function getNewMyAlarm(userId: string): Promise<IGetMyAlarm> {
  const response = await axios.post<IGetMyAlarm>(
    `${ALARM_SERVER}/NewAlarmList`,
    { userId }
  );
  return response.data;
}

export async function postAlarm(
  requestAlarm: IAlarmRequest
): Promise<IAlarmResponse> {
  const response = await axios.post<IAlarmResponse>(
    `${ALARM_SERVER}/createAlarm`,
    requestAlarm
  );
  return response.data;
}

export async function ReadAlarm(alarmId: string): Promise<IAlarmResponse> {
  const response = await axios.post<IAlarmResponse>(`${ALARM_SERVER}/read`, {
    alarmId,
  });
  return response.data;
}

export async function getMyAlarm(userId: string): Promise<IGetMyAlarm> {
  const response = await axios.post<IGetMyAlarm>(
    `${ALARM_SERVER}/MyAlarmList`,
    { userId }
  );
  return response.data;
}
