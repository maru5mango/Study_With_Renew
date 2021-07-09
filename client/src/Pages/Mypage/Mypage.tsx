import React, { useEffect, useState } from 'react';
import querystring from 'query-string';
import Title from '../../Components/Common/Title';
import MypageTab from '../../Components/Mypage/Tab';
import InfoBox from '../../Components/Mypage/InfoBox';
import styled from 'styled-components';
import ProfilePage from '../../Components/Mypage/ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLikeProjects,
  fetchLikeUsers,
  fetchMyLikeProjects,
  fetchMyLikeUsers,
} from '../../modules/like';
import { RootState } from '../../modules';
import { getMyAlarm } from '../../api/alarm';
import { IAlarm } from '../../api/types/alarm';
import { sampleImages } from '../../Components/BuildProject/sampleImages';
import { IProject } from '../../api/types';
import axios from 'axios';
import { PROJECT_SERVER } from '../../Config';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  display: relative;
  top: 50px;
  bottom: 270px;
  padding: 35px 5px 0 5px;
`;

const InfoContainer = styled.div`
  margin-bottom: 4.5rem;
`;

function Mypage() {
  const {
    myLikeProjects: { projects },
    myLikeUsers: { users },
    likeProjects: { projects: likeProjects },
    likeUsers: { users: likeUsers },
  } = useSelector((state: RootState) => state.like);
  const userId = localStorage.getItem('userId');
  const [joined, setJoined] = useState<IProject[]>([]);
  const [progress, setProgress] = useState<IProject[]>([]);
  const dispatch = useDispatch();
  const projectsArray = projects.map((project) => project.ProjectId);
  const userArray = users.map((user) => user.RecieveduserId);
  const [alarmArray, setAlarmArray] = useState<Array<IAlarm>>([]);
  const type = { info: false, project: false, favorite: false, alarm: false };
  const query = querystring.parse(location.search);
  const tab = query.tab;

  switch (tab) {
    case 'project':
      type.project = true;
      break;
    case 'favorite':
      type.favorite = true;
      break;
    case 'alarm':
      type.alarm = true;
      break;
    default:
      type.info = true;
  }

  useEffect(() => {
    dispatch(fetchMyLikeProjects(userId));
  }, [likeProjects]);

  useEffect(() => {
    dispatch(fetchMyLikeUsers(userId));
  }, [likeUsers]);

  useEffect(() => {
    dispatch(fetchLikeProjects());
    dispatch(fetchLikeUsers());
    axios.get(`${PROJECT_SERVER}/joined/${userId}`).then((res) => {
      if (!res.data.success) {
        alert(
          `지원한 프로젝트 리스트를 가져오는 데 실패했습니다 (${res.data.err})`
        );
        return;
      }
      setJoined(res.data.result);
    });
    axios.get(`${PROJECT_SERVER}/progress/${userId}`).then((res) => {
      if (!res.data.success) {
        alert(
          `진행 중인 프로젝트 리스트를 가져오는 데 실패했습니다 (${res.data.err})`
        );
        return;
      }
      setProgress(res.data.result);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getMyAlarm(userId).then((response) => {
        setAlarmArray(response.result);
      });
    }
  }, []);

  return (
    <Container>
      <Title subtitle="LET`s study" title="마이페이지" />
      <MypageTab
        info={type.info}
        project={type.project}
        favorite={type.favorite}
        alarm={type.alarm}
      />
      {type.info && <ProfilePage />}
      <InfoContainer>
        {type.project && (
          <>
            <InfoBox
              title="지원한 프로젝트"
              array={joined}
              defaultText="지원한 프로젝트가 없습니다."
              type="project"
            />
            <InfoBox
              title="진행중인 프로젝트"
              array={progress}
              defaultText="진행중인 프로젝트가 없습니다."
              type="project"
            />
          </>
        )}
        {type.favorite && (
          <>
            <InfoBox
              title="구독중인 프로젝트"
              array={projectsArray}
              defaultText="구독중인 프로젝트가 없습니다."
              type="project"
            />
            <InfoBox
              title="구독중인 사람"
              array={userArray}
              defaultText="구독중인 사람이 없습니다."
              type="user"
            />
          </>
        )}
        {type.alarm && (
          <InfoBox
            title="알람"
            array={alarmArray}
            defaultText="알림 내용이 없습니다."
            type="alarm"
          />
        )}
      </InfoContainer>
    </Container>
  );
}

export default Mypage;
