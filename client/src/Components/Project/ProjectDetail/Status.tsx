import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';
import axios from 'axios';
import { MANAGE_SERVER, USER_SERVER, ALARM_SERVER } from '../../../Config';

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  padding: 29px 24px 16px;
`;

const Title = styled.h3`
  line-height: 1.4375rem;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightGray};
`;

const Ul = styled.ul`
  margin-top: 16px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  & button {
    border: 1px solid ${(props) => props.theme.palette.lightGray};
    border-radius: 2px;
    transition: all 0.2s;
    &:hover {
      background-color: ${(props) => props.theme.palette.darkblue};
      color: ${(props) => props.theme.palette.white};
    }
  }
`;

const PostionText = styled.span`
  font-size: 15px;
  line-height: 1.3125rem;
  margin-right: 30px;
  width: 221px;
`;

const PositionNumber = styled.span`
  font-size: 15px;
  line-height: 1.3125rem;
  color: ${(props) => props.theme.palette.orange};
  margin-right: 34px;
`;

interface Ipos {
  pos: string;
  required: number;
  current: number;
}

interface IProps {
  position: Ipos[];
  projectId: string;
  leaderId: string;
}

const Status = ({ position, projectId, leaderId }: IProps) => {
  const userId = localStorage.getItem('userId');
  const [pos, setPos] = useState('');
  const [isJoin, setIsJoin] = useState('');

  useEffect(() => {
    if (userId !== null) {
      axios.post(`${USER_SERVER}/info`, { _id: userId }).then((res) => {
        if (!res.data.success) {
          alert('회원 정보를 가져오지 못 했습니다');
          return;
        }
        setPos(res.data.user.position);
      });
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      axios
        .post(`${MANAGE_SERVER}/find`, { pid: projectId, uid: userId })
        .then((res) => {
          if (res.data.success) {
            setIsJoin(res.data.msg);
          }
        });
    }
  }, []);

  const handleJoin = (
    uid: string | null,
    pid: string,
    cur: number,
    req: number,
    position: string
  ) => {
    if (uid === null) {
      alert('로그인 후 지원 가능합니다');
      return;
    }
    if (cur === req) {
      alert('더이상 지원할 수 없습니다');
      return;
    }
    if (position !== pos) {
      alert('지원할 수 없는 직무입니다');
      return;
    }
    if (isJoin !== '') {
      alert(isJoin);
      return;
    }
    const msg = prompt('지원 이유');
    if (msg !== null) {
      axios
        .post(`${MANAGE_SERVER}/join`, { uid: uid, pid: pid, msg: msg })
        .then((res) => {
          if (!res.data.success) {
            alert(`프로젝트 지원 요청이 실패했습니다 (${res.data.err})`);
            return;
          }
          axios
            .post(`${ALARM_SERVER}/apply`, {
              sid: uid,
              rid: leaderId,
              contents: projectId,
            })
            .then((response) => {
              if (!response.data.success) {
                alert(
                  `프로젝트 리더에게 지원 요청 알람을 보내는 데 실패했습니다 (${response.data.err})`
                );
                return;
              }
            });
          alert('지원이 완료되었습니다');
        });
    }
  };
  return (
    <Container>
      <Title>모집 현황</Title>
      <Ul>
        {position.length &&
          position.map((item) => (
            <Li key={item.pos}>
              <PostionText>{item.pos}</PostionText>
              <PositionNumber>{`${item.current}/${item.required}`}</PositionNumber>
              {item.current < item.required && (
                <Button
                  ButtonColor="white"
                  ButtonMode="active"
                  ButtonName="지원"
                  ButtonSize="medium"
                  onClick={() =>
                    handleJoin(
                      userId,
                      projectId,
                      item.current,
                      item.required,
                      item.pos
                    )
                  }
                />
              )}
            </Li>
          ))}
      </Ul>
    </Container>
  );
};

export default Status;
