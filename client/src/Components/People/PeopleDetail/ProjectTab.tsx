import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import ProjectBox from '../../Project/ProjectBox';
import { IPos } from '../../../api/users';

const TabTitle = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 1rem;
`;
const CurrentProject = styled.li`
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  height: auto;
  margin-bottom: 4rem;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface PrjInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  state: Array<number>;
  receivedLike: number;
}

const ProjectTab = () => {
  const { project } = useSelector((state: RootState) => state.user);
  if (project?.data === undefined || project?.data.length === 0) {
    return (
      <>
        <TabTitle>나의 프로젝트</TabTitle>
        <CurrentProject>진행 중인 프로젝트가 없습니다.</CurrentProject>
      </>
    );
  } else {
    return (
      <>
        <TabTitle>나의 프로젝트</TabTitle>
        <CurrentProject>
          {project?.data.map((item) => (
            <ProjectBox
              title={item.title}
              description={item.summary}
              image={item.thumb}
              id={item._id}
              state={[
                item.position.reduce((acc: number, cur: IPos) => {
                  return acc + cur.current;
                }, 0),
                item.position.reduce((acc: number, cur: IPos) => {
                  return acc + cur.required;
                }, 0),
              ]}
              category={item.field}
              receivedLike={item.receivedLike}
              key={item._id}
            />
          ))}
        </CurrentProject>
      </>
    );
  }
};

export default ProjectTab;
