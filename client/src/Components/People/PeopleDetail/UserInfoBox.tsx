import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import {
  PostTransfer,
  LocationTransfer,
  WeekTransfer,
  TimeTransfer,
  LevelTransfer,
} from '../../Common/transformValue';

const UserInfoMid = styled.div`
  &,
  & > * {
    display: flex;
  }
  flex-direction: column;
  gap: 15px;
`;
const UserInfoTable = styled.ul`
  flex-direction: column;
  padding: 15px 25px;
  gap: 10px;
  background-color: ${(props) => props.theme.palette.morelightGray};
`;
const UserInfoItem = styled.li`
  display: flex;
`;
const UserIntro = styled.div``;
const Title = styled.div`
  width: 150px;
  min-width: 150px;
  font-size: 0.8em;
  color: ${(props) => props.theme.palette.darkblue};
`;
const Contents = styled.div`
  font-size: 0.8em;
  color: ${(props) => props.theme.palette.black};
`;

const UserInfoBox = () => {
  const { data } = useSelector((state: RootState) => state.user);
  return (
    <UserInfoMid>
      <div>
        <Title>직무</Title>
        <Contents>{PostTransfer(data?.user.position)}</Contents>
      </div>
      <div>
        <Title>숙련도</Title>
        <Contents>{LevelTransfer(data?.user.positionLevel)}</Contents>
      </div>
      <div>
        <Title>Stack</Title>
        <Contents>
          {data?.user.interestSkills && data.user.interestSkills.length > 0
            ? data?.user.interestSkills.join('  ')
            : '아직 관심 기술을 입력하지 않았어요.'}
        </Contents>
      </div>
      <UserInfoTable>
        <UserInfoItem>
          <Title>장소</Title>
          <Contents>
            {data?.user.availableLocation &&
            data.user.availableLocation.length > 0
              ? LocationTransfer(data?.user.availableLocation)
              : '지역 미정'}
          </Contents>
        </UserInfoItem>
        <UserInfoItem>
          <Title>요일</Title>
          <Contents>
            {data?.user.availableWeek && data.user.availableWeek.length > 0
              ? WeekTransfer(data?.user.availableWeek)
              : '요일 미정'}
          </Contents>
        </UserInfoItem>
        <UserInfoItem>
          <Title>모임 시간</Title>
          <Contents>
            {data?.user.availableTime && data.user.availableTime.length > 0
              ? TimeTransfer(data?.user.availableTime)
              : '시간 미정'}
          </Contents>
        </UserInfoItem>
      </UserInfoTable>
      <UserIntro>
        <Title>소개</Title>
        <Contents>
          {data?.user.intro ? data.user.intro : '소개를 입력하지 않았어요.'}
        </Contents>
      </UserIntro>
    </UserInfoMid>
  );
};

export default UserInfoBox;
