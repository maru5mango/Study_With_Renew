import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ReadAlarm } from '../../api/alarm';
import ChattingModalContents from '../People/PeopleDetail/ChattingModalContents';
import ChatRequest from './chatRequest';
import InvitedProject from './InvitedProject';
import Recruit from './Recruit';
import Comment from './Comment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 340px;
  border-radius: 15px;
  padding: 2rem;
  padding-top: 4rem;
  align-items: center;
  background-color: ${(props) => props.theme.palette.white};
`;

const ToUserContainer = styled.div`
  display: flex;
  align-items: center;
  h2 {
    margin-left: 2rem;
    margin-right: 2rem;
    line-height: 30px;
  }
  input {
    text-align: center;
    border-radius: 4px;
    padding: 0.2rem;
    line-height: 30px;
  }
  margin-bottom: 1rem;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`;

interface IProps {
  id: string;
  sendNickname: string;
  contents: string;
  type: 0 | 1 | 2 | 3;
  reset: boolean;
  onResetToggle: (state: boolean) => void;
}

const AlarmModalContents = ({
  id,
  sendNickname,
  contents,
  type,
  reset,
  onResetToggle,
}: IProps) => {
  const tab = {
    0: <ChatRequest sendNickname={sendNickname} contents={contents} />,
    1: <InvitedProject contents={contents} />,
    2: <Recruit contents={contents} />,
    3: <Comment contents={contents} />,
  };
  const onClick = () => {
    ReadAlarm(id).then((response) => {
      alert(response.msg);
      location.reload();
    });
  };
  return (
    <>
      {reset && (
        <Container>
          <ToUserContainer>
            <h2>보낸 사람</h2>
            <input type="text" value={sendNickname} disabled />
            <Button
              ButtonColor="darkblue"
              ButtonMode="active"
              ButtonSize="small"
              ButtonName="답장"
              type="button"
              onClick={() => onResetToggle(false)}
            />
          </ToUserContainer>
          {tab[type]}
          <ButtonArea>
            <Button
              ButtonColor="red"
              ButtonMode="active"
              ButtonSize="small"
              ButtonName="읽음"
              type="button"
              onClick={onClick}
            />
          </ButtonArea>
        </Container>
      )}
      {!reset && <ChattingModalContents nickname={sendNickname} />}
    </>
  );
};

export default AlarmModalContents;
