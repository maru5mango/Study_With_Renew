import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';
import emptyHeart from '../../../img/empty-heart.svg';
import borderHeart from '../../../img/border-heart.svg';
import CheckIcon from '../../../img/check_icon.svg';
import { FieldData } from '../../Common/OptionData';
import { useLocation } from 'react-router-dom';
import LikeButton from '../../Common/LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import {
  fetchLikeProjects,
  fetchProjectLikeUsers,
} from '../../../modules/like';

const Container = styled.div`
  max-width: 280px;
  width: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  width: 100%;
  padding: 20px;
  position: sticky;
  top: 60px;
`;

const HeartAndShareWrap = styled.div`
  display: flex;
  justify-content: center;

  & button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.palette.lightGray};
    border-radius: 2px;
  }
`;

const HeartIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${emptyHeart});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

const HeartBtnWrap = styled.div`
  & div {
    position: unset;
  }

  &:hover {
    ${HeartIcon} {
      background-image: url(${borderHeart});
    }
  }
`;

const FavoriteNumber = styled.span``;

const InfoWrap = styled.div`
  padding-top: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette.lightGray};
    padding: 20px 0;
  }
`;

const CheckTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 5px;
  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url(${CheckIcon});
    margin-right: 8px;
  }
`;

const LeaderInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LeaderImage = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 14px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const LeaderName = styled.span`
  font-size: 15px;
  color: #61b4c7;
`;

const TabText = styled.span`
  color: ${(props) => props.theme.palette.lightGray};
  font-size: 14px;
  line-height: 14px;
`;

const Ul = styled.ul`
  display: flex;
  min-height: 20px;
  overflow-x: auto;
`;

const Li = styled.li`
  margin-right: -20px;
`;

const SubscribeImageWrap = styled.div`
  max-width: 62px;
  width: 62px;
  height: 62px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.palette.faintGray};
  background-color: ${(props) => props.theme.palette.white};
  overflow: hidden;
  position: relative;
`;

const Clipboard = styled.input.attrs({ type: 'text' })`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

interface IProps {
  id: string;
  receivedLike: number;
  avartarImg: string;
  nickname: string;
  startAt: string;
  endAt: string;
  date: string;
  field: string;
}

const RightMenu = ({
  id,
  receivedLike,
  avartarImg,
  nickname,
  startAt,
  endAt,
  date,
  field,
}: IProps) => {
  const [likeCount, setLikeCount] = useState(receivedLike);
  const [isLike, setIsLike] = useState(false);
  const [fieldLabel, setLabel] = useState<string>('');
  const copyUrlRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const {
    likeProjects: { projects },
  } = useSelector((state: RootState) => state.like);
  const { users } = useSelector(
    (state: RootState) => state.like.projectLikeUsers[id]
  ) || {
    users: [],
  };
  const userId = localStorage.getItem('userId');
  const copyURL: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다');
    }
    if (copyUrlRef && copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand('copy');
      alert('클립보드에 저장되었습니다');
    }
  };

  useEffect(() => {
    const f = FieldData.find((item) => {
      return item.value === field;
    });
    setLabel(f ? f.label : '');
  }, [field]);

  useEffect(() => {
    const likeCount = projects.filter((project) => project.ProjectId === id);
    const likeStatus = projects.find(
      (project) => project.ProjectId === id && project.SenduserId === userId
    );
    if (likeStatus) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    setLikeCount(likeCount.length);
  }, [projects]);

  useEffect(() => {
    dispatch(fetchProjectLikeUsers(id));
  }, [id, projects]);

  useEffect(() => {
    dispatch(fetchLikeProjects());
  }, []);

  return (
    <Container>
      <Contents>
        <HeartAndShareWrap>
          <HeartBtnWrap>
            <Button ButtonColor="white" ButtonMode="active" ButtonSize="medium">
              <LikeButton
                isProject={true}
                userId={localStorage.getItem('userId')}
                targetId={id}
                isLike={isLike}
              />
              <FavoriteNumber>{likeCount}</FavoriteNumber>
            </Button>
          </HeartBtnWrap>
          <Button
            ButtonColor="white"
            ButtonMode="active"
            ButtonName="공유"
            ButtonSize="medium"
            onClick={copyURL}
          />
          <Clipboard ref={copyUrlRef} value={window.location.href} readOnly />
        </HeartAndShareWrap>
        <InfoWrap>
          <CheckTitle>리더 정보</CheckTitle>
          <LeaderInfo>
            <LeaderImage>
              <Image
                src={
                  avartarImg
                    ? avartarImg
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                alt="user_image"
              />
            </LeaderImage>
            <LeaderName>{nickname}</LeaderName>
          </LeaderInfo>
        </InfoWrap>
        <InfoWrap>
          <CheckTitle>프로젝트 기간</CheckTitle>
          <TabText>
            {startAt} ~ {endAt} ({date}일)
          </TabText>
        </InfoWrap>
        <InfoWrap>
          <CheckTitle>프로젝트 분야</CheckTitle>
          <TabText>{fieldLabel}</TabText>
        </InfoWrap>
        <InfoWrap>
          <CheckTitle>구독중인 사람</CheckTitle>
          <Ul>
            {users.length > 0
              ? users.map((user) => (
                  <Li key={user.SenduserId._id}>
                    <SubscribeImageWrap>
                      <Image
                        src={
                          user.SenduserId.avartarImg
                            ? user.SenduserId.avartarImg
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        }
                        alt="user_image"
                      />
                    </SubscribeImageWrap>
                  </Li>
                ))
              : '구독중인 사람이 없습니다.'}
          </Ul>
        </InfoWrap>
      </Contents>
    </Container>
  );
};

export default RightMenu;
