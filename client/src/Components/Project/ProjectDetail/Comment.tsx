import React from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';

const Container = styled.div`
  margin-bottom: 5px;
`;

const ContentsWrap = styled.div`
  background-color: ${(props) => props.theme.palette.white};
  border-radius: 4px;
  box-shadow: 0 3px 12px 0 rgb(0 0 0 / 6%);
  box-sizing: border-box;
  padding: 20px 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrap = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 16px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const Name = styled.p`
  font-size: 1rem;
  color: #42495b;
  cursor: pointer;
`;

const Time = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.palette.lightGray};
`;

const CommentContentWrap = styled.div`
  padding-left: 60px;
  margin-bottom: 12px;
`;

const Text = styled.textarea`
  height: auto;
  resize: none;
  background-color: ${(props) => props.theme.palette.white};
  border: none;
  margin-bottom: 13px;
  width: 100%;
  font-size: 0.875rem;
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
`;

interface IProps {
  avartarImg: string | undefined;
  nickname: string;
  time: Date;
  content: string;
  remove: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Comment = ({ avartarImg, nickname, time, content, remove }: IProps) => {
  return (
    <Container>
      <ContentsWrap>
        <Top>
          <UserInfo>
            <ImageWrap>
              <Image
                src={
                  avartarImg
                    ? avartarImg
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                alt="userImg"
              />
            </ImageWrap>
            <Name>{nickname}</Name>
          </UserInfo>
          <Time>
            {`${time.getFullYear()}.${
              time.getMonth() + 1
            }.${time.getDate()} / ${time.getHours()}:${time.getMinutes()}`}
            {remove && (
              <Button
                ButtonColor="red"
                ButtonMode="active"
                ButtonName="삭제"
                ButtonSize="small"
                onClick={remove}
              />
            )}
          </Time>
        </Top>
        <CommentContentWrap>
          <Text disabled rows={2} maxLength={1000} value={content} />
        </CommentContentWrap>
      </ContentsWrap>
    </Container>
  );
};

export default Comment;
