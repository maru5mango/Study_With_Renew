import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import SimpleModal from '../../Common/SimpleModal';
import ChattingModalContents from './ChattingModalContents';
import ProjectInvitedContents from './ProjectInvitedContents';
import { getProjectList } from '../../../api/users';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.p`
  font-size: 1.5em;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

interface IProps {
  nickname: string;
}

const UserInfoTop = ({ nickname }: IProps) => {
  const { auth } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const [projectList, setProjectList] = useState<Array<any>>();
  const handleOnChange = () => {
    if (!auth.data?.isAuth) {
      alert('로그인 후 사용 할 수 있는 기능입니다.');
      setOpen(false);
    }
    setOpen(!open);
  };
  const ChattingModalOpen = () => {
    if (!auth.data?.isAuth) {
      alert('로그인 후 사용 할 수 있는 기능입니다.');
      setOpen(false);
    } else {
      setOpen(!open);
      setMode(true);
    }
  };
  const ProjectInvitedModalOpen = () => {
    if (!auth.data?.isAuth) {
      alert('로그인 후 사용 할 수 있는 기능입니다.');
      setOpen(false);
    } else {
      setOpen(!open);
      setMode(false);
    }
  };
  useEffect(() => {
    if (auth.data) {
      getProjectList(auth.data.name).then((response) =>
        setProjectList(response.data)
      );
    }
  }, []);
  return (
    <Container>
      <Username>{nickname}</Username>
      <ButtonGroup>
        <Button
          ButtonColor="red"
          ButtonMode="active"
          ButtonSize="medium"
          ButtonName="1:1 대화"
          onClick={ChattingModalOpen}
        />
        <Button
          ButtonColor="darkblue"
          ButtonMode="active"
          ButtonSize="medium"
          ButtonName="프로젝트 초대"
          onClick={ProjectInvitedModalOpen}
        />
      </ButtonGroup>
      <SimpleModal open={open} onToggle={handleOnChange}>
        {mode ? (
          <ChattingModalContents nickname={nickname} />
        ) : (
          <ProjectInvitedContents
            nickname={nickname}
            projectList={projectList}
          />
        )}
      </SimpleModal>
    </Container>
  );
};

export default UserInfoTop;
