import { PromiseProvider } from 'mongoose';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import Button from '../../Common/Button';
import axios from 'axios';
import { COMMENT_SERVER, USER_SERVER, ALARM_SERVER } from '../../../Config';

const Container = styled.div``;

const InputSection = styled.div`
  width: 100%;
  margin-bottom: 5px;
  padding: 26px 40px 24px;
  background-color: ${(props) => props.theme.palette.faintGray};
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
`;

const TabTitle = styled.h3`
  font-size: 1.375rem;
  line-height: 1.4375rem;
  font-weight: 700;
  padding-bottom: 15px;
`;

const InputWrap = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Thumb = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 16px;
  border-radius: 100px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 13px 16px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  font-size: 0.8rem;
  border-radius: 4px;
  resize: none;
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ButtonWrapper = styled.div`
  width: calc(100% - 60px);
  margin-left: 60px;
`;

const P = styled.p`
  margin-top: 1.5rem;
`;

interface IProps {
  projectId: string;
  leaderId: string;
}

interface IComment {
  nickname: string;
  avartarImg: string | undefined;
  createdAt: Date;
  content: string;
}

const Question = ({ projectId, leaderId }: IProps) => {
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState<IComment[]>([]);
  const [msg, setMsg] = useState('');
  const [avartarImg, setAvartarImg] = useState(
    'https://letspl.me/assets/images/prof_noImg.svg'
  );
  const [nickname, setNickname] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMsg(e.target.value);
  };
  const handleRemove = (
    writer: string | null,
    projectId: string,
    content: string,
    createdAt: Date
  ) => {
    axios
      .post(`${COMMENT_SERVER}/remove`, {
        writer: writer,
        projectId: projectId,
        content: content,
        createdAt: createdAt,
      })
      .then((res) => {
        if (!res.data.success) {
          alert(`????????? ????????? ?????????????????? (${res.data.err})`);
          return;
        }
        axios.get(`${COMMENT_SERVER}/${projectId}`).then((res) => {
          if (!res.data.success) {
            alert(`Comment ????????? ???????????? ??? ?????????????????? (${res.data.err})`);
            return;
          }
          setComments(res.data.result);
        });
      });
  };
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (userId === null) {
      alert('????????? ??? ??????????????????');
      return;
    }
    axios
      .post(`${COMMENT_SERVER}`, {
        writer: userId,
        projectId: projectId,
        content: msg,
      })
      .then((response) => {
        if (!response.data.success) {
          alert(`????????? ????????? ?????????????????? (${response.data.err})`);
          return;
        }
        if (userId !== leaderId) {
          axios
            .post(`${ALARM_SERVER}/comment`, {
              sid: userId,
              rid: leaderId,
              contents: projectId,
            })
            .then((res) => {
              if (!res.data.success) {
                alert(
                  `???????????? ???????????? ?????? ????????? ????????? ??? ?????????????????? (${res.data.err})`
                );
                return;
              }
            });
        }
        axios.get(`${COMMENT_SERVER}/${projectId}`).then((res) => {
          if (!res.data.success) {
            alert(`Comment ????????? ???????????? ??? ?????????????????? (${res.data.err})`);
            return;
          }
          setComments(res.data.result);
          setMsg('');
        });
      });
  };

  useEffect(() => {
    axios.get(`${COMMENT_SERVER}/${projectId}`).then((res) => {
      if (!res.data.success) {
        alert(`Comment ????????? ???????????? ??? ?????????????????? (${res.data.err})`);
        return;
      }
      setComments(res.data.result);
    });
    if (userId !== null) {
      axios.post(`${USER_SERVER}/info`, { _id: userId }).then((res) => {
        if (!res.data.success) {
          alert('?????? ????????? ???????????? ??? ????????????');
          return;
        }
        setNickname(res.data.user.nickname);
        res.data.user.avartarImg
          ? setAvartarImg(res.data.user.avartarImg)
          : setAvartarImg(
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            );
      });
    }
    return () => setComments([]);
  }, []);

  return (
    <Container>
      <InputSection>
        <TabTitle>??????/????????? ???????????????!</TabTitle>
        <InputWrap>
          <Thumb>
            <Image src={avartarImg} alt="thumb" />
          </Thumb>
          <TextInput
            placeholder="??????????????? ?????? ???????????? ?????????????????? ???????????????"
            maxLength={1000}
            rows={6}
            value={msg}
            onChange={handleChange}
          />
        </InputWrap>
        <ButtonWrapper>
          <Button
            ButtonColor="darkblue"
            ButtonMode="active"
            ButtonName="??????"
            ButtonSize="medium"
            onClick={handleSubmit}
          />
        </ButtonWrapper>
      </InputSection>
      {comments.length ? (
        comments.map((comment) => (
          <Comment
            avartarImg={comment.avartarImg}
            content={comment.content}
            nickname={comment.nickname}
            time={new Date(comment.createdAt)}
            key={comment.createdAt.toString()}
            remove={
              nickname === comment.nickname
                ? () =>
                    handleRemove(
                      userId,
                      projectId,
                      comment.content,
                      new Date(comment.createdAt)
                    )
                : undefined
            }
          />
        ))
      ) : (
        <P></P>
      )}
    </Container>
  );
};

export default Question;
