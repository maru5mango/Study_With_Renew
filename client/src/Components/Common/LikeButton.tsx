import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fullHeart from '../../img/full-heart.svg';
import emptyHeart from '../../img/empty-heart.svg';
import borderHeart from '../../img/border-heart.svg';
import axios from 'axios';
import { LIKE_SERVER } from '../../Config';
import { ILike } from '../../../../server/models/Like.interface';
import { useDispatch } from 'react-redux';
import { fetchLikeProjects, fetchLikeUsers } from '../../modules/like';

const HeartBtn = styled.div<{ isLike: boolean }>`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 15px;
  right: 20px;
  background-image: url(${(props) => (props.isLike ? fullHeart : emptyHeart)});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  &:hover {
    background-image: url(${borderHeart});
  }
`;

interface IProps {
  isProject: boolean;
  userId: null | string;
  targetId: null | string;
  isLike: boolean;
}

const LikeButton = ({ isProject, userId, targetId, isLike }: IProps) => {
  const LIKE = isLike ? 'unLike' : 'upLike';
  const dispatch = useDispatch();

  const handleFetchLikeList = () => {
    if (isProject) {
      dispatch(fetchLikeProjects());
    } else {
      dispatch(fetchLikeUsers());
    }
  };

  const handleLike = async () => {
    try {
      const formData = {
        [isProject ? 'projectId' : 'recieveduserId']: targetId,
        userId,
      };
      const {
        data: { success },
      } = await axios.post(`${LIKE_SERVER}/${LIKE}`, formData);
      if (success) {
        handleFetchLikeList();
      }
    } catch (error) {
      alert(`좋아요 관련 오류가 발생했습니다. ${error}`);
    }
  };

  const onClickLike = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!userId) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    handleLike();
  };

  return <HeartBtn onClick={onClickLike} isLike={isLike} />;
};

export default LikeButton;
