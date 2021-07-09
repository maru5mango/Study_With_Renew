import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostTransfer } from '../../Common/transformValue';

const User = styled.li`
  width: 100%;
  max-width: 200px;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const UserTop = styled.div`
  height: 90px;
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.palette.gray};
`;
const UserImg = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const Userdetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 120px;
`;
// const Username = styled.p``;
const Menu = styled.ul`
  width: 80px;
  height: 80px;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 18px;
  left: 0px;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.palette.white};
`;
const MenuItem = styled.li`
  font-size: 0.6em;
`;
const ToProfile = styled(Link)``;
const Username = styled.div`
  display: inline-block;
  position: relative;
  font-weight: bold;
  margin-bottom: 5px;
  font-weight: bold;
  margin: 5px 0 8px 0;
  &:hover ${Menu} {
    cursor: pointer;
    display: grid;
  }
`;
const UserStackList = styled.p`
  color: ${(props) => props.theme.palette.lightGray};
  font-size: 0.6em;
  font-weight: bold;
`;
const UserStack = styled.span`
  margin-right: 5px;
  line-height: 1.4em;
`;
const UserBottom = styled.div`
  width: 100%;
  height: 40px;
  font-size: 0.7em;
  color: ${(props) => props.theme.palette.gray};
  display: flex;
  align-items: center;
`;

interface User {
  avartarImg: string;
  nickname: string;
  interestSkills: string[];
  position: string;
}

const RecommendUser = ({
  avartarImg,
  nickname,
  interestSkills,
  position,
}: User): ReactElement => (
  <User>
    <UserTop>
      <Link to={`/people/${nickname}`}>
        <UserImg src={avartarImg} alt="Avatar" />
      </Link>
      <Userdetail>
        <Username>
          {nickname}
          <Menu>
            <MenuItem>
              <ToProfile to={`/people/${nickname}`}>프로필</ToProfile>
            </MenuItem>
            <MenuItem>1:1 대화</MenuItem>
            <MenuItem>프로젝트 초대</MenuItem>
          </Menu>
        </Username>
        <UserStackList>
          {interestSkills.map((stack, index) => (
            <UserStack key={index}>{stack}</UserStack>
          ))}
        </UserStackList>
      </Userdetail>
    </UserTop>
    <UserBottom>[직무] {PostTransfer(position)}</UserBottom>
  </User>
);

export default RecommendUser;
