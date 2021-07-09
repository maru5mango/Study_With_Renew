import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImgContainer from '../../../Components/People/PeopleDetail/ImgContainer';
import UserInfoTop from '../../../Components/People/PeopleDetail/UserInfoTop';
import ProjectTab from '../../../Components/People/PeopleDetail/ProjectTab';
import UserInfoBox from '../../../Components/People/PeopleDetail/UserInfoBox';
import { useDispatch } from 'react-redux';
import { getUserThunk, getProjectListThunk } from '../../../modules/userInfo';
import { useParams } from 'react-router';
import { fetchLikeProjects } from '../../../modules/like';

const UserContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0px auto;
  padding-top: 30px;
  display: flex;
`;
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PeopleDetailPresenter = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  dispatch(getUserThunk(username));
  dispatch(getProjectListThunk(username));
  dispatch(fetchLikeProjects());

  return (
    <UserContainer>
      <ImgContainer />
      <UserInfo>
        <UserInfoTop nickname={username} />
        <UserInfoBox />
        <ProjectTab />
      </UserInfo>
    </UserContainer>
  );
};

export default PeopleDetailPresenter;
