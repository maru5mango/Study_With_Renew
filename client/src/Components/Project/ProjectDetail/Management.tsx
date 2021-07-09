import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import Button from '../../../Components/Common/Button';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { MANAGE_SERVER, PROJECT_SERVER } from '../../../Config';
import { LevelTransfer } from '../../../Components/Common/transformValue';

const Container = styled.div``;
const Section = styled.section`
  margin-bottom: 5rem;
`;
const Title = styled.h3`
  line-height: 1.4375rem;
  font-size: 1.375rem;
  font-weight: bold;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.palette.lightGray};
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  margin-top: 2rem;
`;

interface IProps {
  projectId: string;
  leaderId: string;
}

interface IUser extends Document {
  item: {
    _id: string;
    avartarImg: string;
    nickname: string;
    email: string;
    position: string;
    positionLevel: string;
    interestSkills: string[];
    receivedLike: number;
  };
  msg?: string;
}

function Management({ projectId, leaderId }: IProps) {
  const history = useHistory();
  const [joinList, setJoinList] = useState<IUser[]>([]);
  const [memberList, setMemberList] = useState<IUser[]>([]);
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    axios
      .post(`${MANAGE_SERVER}/deleteProject`, { pid: projectId })
      .then((res) => {
        if (!res.data.success) {
          alert(`프로젝트 삭제를 실패했습니다 (${res.data.err})`);
          return;
        }
        alert('프로젝트 삭제 완료');
        history.push('/');
      });
  };

  const reject = (id: string) => {
    axios
      .post(`${MANAGE_SERVER}/reject`, { pid: projectId, uid: id })
      .then((res) => {
        if (!res.data.success) {
          alert(`지원자 삭제를 실패했습니다 (${res.data.err})`);
          return;
        }
        alert('지원자 삭제 완료');
        setJoinList([]);
      });
  };
  const accept = (id: string, pos: string) => {
    axios
      .post(`${MANAGE_SERVER}/accept`, { pid: projectId, uid: id, pos: pos })
      .then((res) => {
        if (!res.data.success) {
          alert(`지원 승인을 실패했습니다 (${res.data.err})`);
          return;
        }
        alert('지원 승인 완료');
        setJoinList([]);
        setMemberList([]);
      });
  };

  const remove = (id: string, pos: string) => {
    axios
      .post(`${MANAGE_SERVER}/remove`, { pid: projectId, uid: id, pos: pos })
      .then((res) => {
        if (!res.data.success) {
          alert(`멤버 삭제를 실패했습니다 (${res.data.err})`);
          return;
        }
        alert('멤버 삭제 완료');
        setMemberList([]);
      });
  };

  useEffect(() => {
    axios.get(`${PROJECT_SERVER}/joinList/${projectId}`).then((res) => {
      if (!res.data.success) {
        alert(`지원 현황 정보를 가져오는 데 실패했습니다 (${res.data.err})`);
        return;
      }
      setJoinList(res.data.result);
    });
  }, [joinList]);

  useEffect(() => {
    axios.get(`${PROJECT_SERVER}/memberList/${projectId}`).then((res) => {
      if (!res.data.success) {
        alert(`현재 멤버 정보를 가져오는 데 실패했습니다 (${res.data.err})`);
        return;
      }
      setMemberList(res.data.result);
    });
  }, [memberList]);

  useEffect(() => {
    return () => {
      setJoinList([]);
      setMemberList([]);
    };
  }, []);

  return (
    <Container>
      <Section>
        <Title>지원현황</Title>
        {joinList.length ? (
          joinList.map((user) => (
            <UserInfo
              avatarImg={user.item.avartarImg}
              isAdd={true}
              isRemove={true}
              nickName={user.item.nickname}
              pos={user.item.position}
              posLv={LevelTransfer(user.item.positionLevel)}
              reason={user.msg ? user.msg : '작성한 내용이 없습니다.'}
              key={user.item._id}
              addHandler={() => accept(user.item._id, user.item.position)}
              removeHandler={() => reject(user.item._id)}
            />
          ))
        ) : (
          <P>지원자가 없습니다</P>
        )}
      </Section>
      <Section>
        <Title>현재멤버</Title>
        {memberList.length ? (
          memberList.map((user) => (
            <UserInfo
              avatarImg={user.item.avartarImg}
              isAdd={false}
              isRemove={true}
              nickName={user.item.nickname}
              pos={user.item.position}
              key={user.item._id}
              removeHandler={() => remove(user.item._id, user.item.position)}
            />
          ))
        ) : (
          <P>현재 참가한 멤버가 없습니다</P>
        )}
      </Section>
      <Section>
        <BtnBox>
          <Button
            ButtonName="프로젝트 삭제"
            ButtonSize="medium"
            ButtonColor="darkblue"
            ButtonMode="active"
            onClick={handleDelete}
          />
          <Link to={`/updateProject/${projectId}/${leaderId}`}>
            <Button
              ButtonName="프로젝트 수정"
              ButtonSize="medium"
              ButtonColor="red"
              ButtonMode="active"
            />
          </Link>
        </BtnBox>
      </Section>
    </Container>
  );
}

export default Management;
