import React, { useState } from 'react';
import styled from 'styled-components';
import basicHeart from '../../img/basic-heart.svg';
import { Link } from 'react-router-dom';
import { FieldData } from '../Common/OptionData';
import LikeButton from '../Common/LikeButton';
import { useEffect } from 'react';
import { RootState } from '../../modules';
import { useSelector } from 'react-redux';

const ProjectTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 90%;
  height: 70px;
  bottom: -35px;
  left: 5%;
  padding: 10px 8px 8px 8px;
  border-radius: 8px 8px 8px 8px;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;
  background-color: ${(props) => props.theme.palette.white};
  transition: transform 0.3s ease;
  color: ${(props) => props.theme.palette.black};
`;

const ProjectContent = styled.div`
  position: relative;
  max-width: 384px;
  width: 100%;
  height: 220px;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    ${ProjectTitle} {
      transform: translateY(-5px);
    }
  }
  @media screen and (max-width: 1150px) {
    width: 330px;
  }
  @media screen and (max-width: 1024px) {
    width: 240px;
  }
  @media screen and (max-width: 750px) {
    width: 340px;
  }
  @media screen and (max-width: 700px) {
    width: 300px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 420px) {
    width: 340px;
  }
`;

const ProjectCategory = styled.div``;

const RecruitmentStatus = styled.div`
  position: absolute;
  top: 15px;
  left: 20px;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-end;
  padding: 46px 20px;
  width: 100%;
  height: 100%;
`;

const Recruitment = styled.h4``;

const Description = styled.p`
  display: none;
`;

const FavoriteNumber = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const HeartIcon = styled.div`
  width: 12px;
  height: 11px;
  background-image: url(${basicHeart});
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 5px;
`;

const FavoriteCount = styled.span``;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: transform 0.3s ease-in-out;
`;

const ProjectThumb = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px 8px 8px 8px;
  overflow: hidden;
  font-weight: bold;
  color: ${(props) => props.theme.palette.white};
  &:hover {
    ${Image} {
      transform: scale(1.1);
    }
    ${Recruitment} {
      display: none;
    }
    ${Description} {
      display: block;
    }
  }
`;

const ProjectName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 8px 0;
`;

interface IProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  state: Array<number>;
  category: string;
  receivedLike: number;
}

const ProjectBox = ({
  id,
  title,
  description,
  image,
  state,
  category,
  receivedLike,
}: IProjectProps) => {
  const [likeCount, setLikeCount] = useState(receivedLike);
  const [isLike, setIsLike] = useState(false);

  const {
    likeProjects: { projects },
  } = useSelector((state: RootState) => state.like);
  const userId = localStorage.getItem('userId');

  const fieldLabel = FieldData.find((item) => {
    if (item.value === category) {
      return item;
    }
  });

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

  return (
    <Link to={`/project/${id}`}>
      <ProjectContent>
        <ProjectThumb>
          <Image src={image} alt="project" />
          <RecruitmentStatus>
            {state[0] >= state[1] ? '모집완료' : '모집중'}
          </RecruitmentStatus>
          <LikeButton
            isProject={true}
            userId={localStorage.getItem('userId')}
            targetId={id}
            isLike={isLike}
          />
          <ProjectInfo>
            <Recruitment>
              모집인원: {state[0]}/{state[1]}
            </Recruitment>
            <Description>{description}</Description>
            <FavoriteNumber>
              <HeartIcon />
              <FavoriteCount>{likeCount}</FavoriteCount>
            </FavoriteNumber>
          </ProjectInfo>
        </ProjectThumb>
        <ProjectTitle>
          <ProjectCategory>{`[${fieldLabel?.label}]`}</ProjectCategory>
          <ProjectName>{title}</ProjectName>
        </ProjectTitle>
      </ProjectContent>
    </Link>
  );
};

export default ProjectBox;
