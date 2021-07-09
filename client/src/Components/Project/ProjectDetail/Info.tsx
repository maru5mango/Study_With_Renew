import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Status from './Status';
import Reference from './Reference';
import { Link } from 'react-router-dom';
import theme from '../../../theme';
import PeopleListItem from '../../People/PeopleListItem';
import axios from 'axios';
import { PROJECT_SERVER } from '../../../Config';

const Container = styled.div``;

const Section = styled.div`
  margin-bottom: 35px;
`;

const TabTitle = styled.h3`
  font-size: 1.375rem;
  line-height: 1.4375rem;
  font-weight: 700;
  padding-bottom: 15px;
`;

const P = styled.p`
  line-height: 1.5;
  margin-top: 1rem;
`;

const TabText = styled.p`
  color: ${(props) => props.theme.palette.gray};
`;

const Description = styled.div`
  & h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  blockquote,
  em,
  a {
    margin: revert;
    padding: revert;
    border: revert;
    font-size: revert;
    font: revert;
    vertical-align: revert;
    list-style: revert;
  }
  & blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
  & h1 {
    font-size: 2em;
  }
  & h2 {
    font-size: 1.5em;
  }
`;

interface Ipos {
  pos: string;
  required: number;
  current: number;
}

interface IProps {
  leaderId: string;
  info: string;
  referenceURL: string[];
  nickname: string;
  position: Ipos[];
  projectId: string;
  uPos: string;
  uPosLv: string;
  uInterestSkills: string[];
  uReceivedLike: number;
  avartarImg: string;
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
}

const Info = ({
  leaderId,
  info,
  referenceURL,
  nickname,
  position,
  projectId,
  uPos,
  uPosLv,
  uInterestSkills,
  uReceivedLike,
  avartarImg,
}: IProps) => {
  const [memberList, setMemberList] = useState<IUser[]>([]);
  useEffect(() => {
    axios.get(`${PROJECT_SERVER}/memberList/${projectId}`).then((res) => {
      if (!res.data.success) {
        alert(`현재 멤버 정보를 가져오는 데 실패했습니다 (${res.data.err})`);
        return;
      }
      setMemberList(res.data.result);
    });
  }, []);

  useEffect(() => {
    return () => setMemberList([]);
  }, []);

  return (
    <Container>
      <Section>
        <Status position={position} projectId={projectId} leaderId={leaderId} />
      </Section>
      <Section>
        <TabTitle>- 소개</TabTitle>
        <Description dangerouslySetInnerHTML={{ __html: info }} />
      </Section>
      <Section>
        <TabTitle>- 참고자료</TabTitle>
        {referenceURL.length <= 1 && referenceURL[0] === '' ? (
          <TabText>등록된 참고 자료가 없습니다.</TabText>
        ) : (
          referenceURL.map((item) => <Reference link={item} key={item} />)
        )}
      </Section>
      <Section>
        <TabTitle>리더</TabTitle>
        <PeopleListItem
          id={leaderId}
          avartarImg={avartarImg}
          interestSkills={uInterestSkills}
          nickname={nickname}
          position={uPos}
          positionLevel={uPosLv}
          receivedLike={uReceivedLike}
        />
      </Section>
      <Section>
        <TabTitle>멤버</TabTitle>
        {memberList.length ? (
          memberList.map((user) => (
            <PeopleListItem
              id={user.item._id}
              key={user.item._id}
              avartarImg={user.item.avartarImg}
              interestSkills={user.item.interestSkills}
              nickname={user.item.nickname}
              position={user.item.position}
              positionLevel={user.item.positionLevel}
              receivedLike={user.item.receivedLike}
            />
          ))
        ) : (
          <P>참가한 멤버가 없습니다</P>
        )}
      </Section>
    </Container>
  );
};

export default Info;
