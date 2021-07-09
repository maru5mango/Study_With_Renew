import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecommendUser from './PeopleRecommendUser';
import { USER_SERVER } from '../../../Config';
import axios from 'axios';

const RecommendTab = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.palette.jade};
  margin-bottom: 20px;
  & > * {
    padding: 0 15px;
  }
`;
const RecommendTabHeader = styled.p`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.palette.lightJade};
  color: ${(props) => props.theme.palette.jade};
  font-weight: bold;
`;
const RecommendList = styled.ul`
  display: flex;
  width: 100%;
  overflow-x: auto;
`;

interface IUser {
  avartarImg: string;
  nickname: string;
  position: string;
  interestSkills: string[];
}

const defaultProps: IUser[] = [];

const PeopleRecommendTable = () => {
  const [users, setUsers] = useState(defaultProps);

  useEffect(() => {
    axios.get(`${USER_SERVER}/recommend`).then((response) => {
      const reqUsers = response.data.user;
      const data: [IUser] = reqUsers.map((user: any) => {
        return {
          avartarImg: user.avartarImg
            ? user.avartarImg
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          nickname: user.nickname,
          position: user.position,
          interestSkills: user.interestSkills,
        };
      });
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    return () => setUsers(defaultProps);
  }, []);
  return (
    <RecommendTab>
      <RecommendTabHeader>
        [추천] 좌우 고민하지 말고 바로 이 멤버!
      </RecommendTabHeader>
      <RecommendList>
        {users.map((user, index) => (
          <RecommendUser
            key={index}
            avartarImg={user.avartarImg}
            nickname={user.nickname}
            position={user.position}
            interestSkills={user.interestSkills}
          />
        ))}
      </RecommendList>
    </RecommendTab>
  );
};

export default PeopleRecommendTable;
