import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../img/logo.png';
import LoginAndSignupModal from './LoginAndSignupModal';
import ProfileModal from './ProfileModal';
import Button from './Button';
import { USER_SERVER } from '../../Config';
import axios from 'axios';
import { getNewMyAlarm } from '../../api/alarm';
import { IAlarm } from '../../api/types/alarm';
import { IProject, getProjectList } from '../../api/users';

const HeaderStyle = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  margin: 0 auto;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.palette.white};
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 3px 27px 0 rgba(0, 0, 0, 0.02);
`;

const LogoStyle = styled.img`
  cursor: pointer;
  width: 140px;
  height: 35px;
  border-style: none;
  margin-left: 1.8rem;
`;

const MenuStyle = styled.div`
  width: 40%;
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 1rem;
  margin-inline-end: 1rem;
  padding-inline-start: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
`;

const AtagStyle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.palette.gray};
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const LoginStyle = styled.div`
  width: 100px;
  display: flex;
  margin-left: auto;
  font-size: 10px;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  margin-right: 3rem;
`;

const LoginText = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.palette.gray};
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const SigninStyle = styled.div`
  width: 20%;
  margin-left: auto;
  margin-right: 3rem;
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const Web = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  const [openLoginSignup, setOpenLoginSignup] = useState(false);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    pos: '',
    level: '',
    avartarImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  });

  const [joinData, setJoinData] = useState<Array<IProject>>([]);
  const [alarmList, setAlarmList] = useState<Array<IAlarm>>([]);

  // api/user/info 에서 name, pos, level 값 가져오기
  // api/alarm 에서 get 방식으로 (token으로) 해당 되는 알람정보 받아오기
  // pai/project/FindMyProject 으로 (token으로) 자신이 생성한 프로젝트 가져오기

  const switchLoginSignup = (login: boolean) => {
    setIsLogin(login);
  };

  const onToggle = (login: boolean) => {
    switchLoginSignup(login);
    setOpenLoginSignup((open) => !open);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoginSuccess(false);
    } else {
      setLoginSuccess(true);
      getNewMyAlarm(userId).then((response) => {
        if (!response.success) {
          alert('사용자 알람을 가져오지 못했습니다.');
        }
        setAlarmList(response.result);
      });
    }
    if (LoginSuccess) {
      setOpenProfile(false);
      axios.post(`${USER_SERVER}/info`, { _id: userId }).then((response) => {
        if (response.data.success) {
          const user = response.data.user;
          const UserInfo = Object.assign({}, profileInfo);
          UserInfo.name = user.nickname;
          UserInfo.pos = user.position;
          UserInfo.level = user.positionLevel;
          if (user.avartarImg) {
            UserInfo.avartarImg = user.avartarImg;
          }
          setProfileInfo(UserInfo);
          getProjectList(UserInfo.name).then((response) =>
            setJoinData(response.data)
          );
        } else {
          alert('정보를 가져오는데 실패했습니다.');
        }
      });
    }
  }, [LoginSuccess]);

  return (
    <HeaderStyle>
      <Link to="/">
        <LogoStyle src={logo} alt="logo" />
      </Link>
      <Web>
        <MenuStyle>
          <AtagStyle to="/project">Project</AtagStyle>
          <AtagStyle to="/people">Co-Worker</AtagStyle>
        </MenuStyle>
        {LoginSuccess ? (
          <SigninStyle>
            <Link to="/BuildProject">
              <Button
                ButtonColor="orange"
                ButtonMode="active"
                ButtonName="프로젝트 생성"
                ButtonSize="large"
              />
            </Link>
            <UserImg
              src={profileInfo.avartarImg}
              alt="Avatar"
              onClick={() => setOpenProfile((open) => !open)}
            />
            {openProfile && (
              <ProfileModal
                name={profileInfo.name}
                level={profileInfo.level}
                pos={profileInfo.pos}
                alarm={alarmList}
                joinData={joinData}
                avartarImg={profileInfo.avartarImg}
                setLoginSuccess={setLoginSuccess}
              />
            )}
          </SigninStyle>
        ) : (
          <div>
            <LoginStyle>
              <LoginText onClick={() => onToggle(false)}>가입</LoginText>
              <Divider>/</Divider>
              <LoginText onClick={() => onToggle(true)}>로그인</LoginText>
            </LoginStyle>
            <LoginAndSignupModal
              openLoginSignup={openLoginSignup}
              onToggle={onToggle}
              switchLoginSignup={switchLoginSignup}
              isLogin={isLogin}
              setLoginSuccess={setLoginSuccess}
            />
          </div>
        )}
      </Web>
    </HeaderStyle>
  );
}
export default Header;
