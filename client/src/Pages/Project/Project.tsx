import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProjectHeader from '../../Components/Project/ProjectHeader';
import ProjectRecommend from '../../Components/Project/ProjectRecommend';
import ProjectRecommendBox from '../../Components/Project/ProjectRecommendBox';
import ProjectBox from '../../Components/Project/ProjectBox';
import ProjectBoxList from '../../Components/Project/ProjectBoxList';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PROJECT_SERVER } from '../../Config';
import { fetchLikeProjects } from '../../modules/like';
import { useDispatch } from 'react-redux';

const Container = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0px auto 30px;
  height: 100%;
  min-height: 100vh;
`;

interface IProject {
  id: string;
  title: string;
  thumb: string;
  summary: string;
  field: string;
  receivedLike: number;
  position: number[];
}

const defaultProps: IProject[] = [];

interface IRecommend {
  id: string;
  title: string;
  summary: string;
  thumb: string;
  field: string;
}

const initRecommends: IRecommend[] = [];

const Project = () => {
  const [projects, setProjects] = useState(defaultProps);
  const [recommends, setRecommends] = useState(initRecommends);
  const page = useRef(1);
  const [endpoint, setEndpoint] = useState(`${PROJECT_SERVER}`);
  const [isRecruit, setIsRecruit] = useState(false);
  const dispatch = useDispatch();

  const refreshProject = () => {
    page.current = 1;
    axios
      .get(endpoint, {
        params: {
          page: page.current,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          alert('데이터를 가져오는데 실패했습니다.');
          return false;
        }
        if (response.data.project.length == 0) {
          setProjects([]);
          alert('데이터가 없습니다.');
          return false;
        }
        page.current += 1;
        let projectList = response.data.project;
        if (isRecruit) {
          projectList = projectList.filter(
            (prj: any) =>
              !prj.position.reduce(
                (acc: boolean, v: any) => acc && v['current'] === v['required'],
                true
              )
          );
        }
        const project: IProject[] = projectList.map((projectInfo: any) => {
          return {
            id: projectInfo._id,
            title: projectInfo.title,
            thumb: projectInfo.thumb,
            summary: projectInfo.summary,
            field: projectInfo.field,
            receivedLike: projectInfo.receivedLike,
            position: [
              projectInfo.position.reduce(
                (acc: number, v: any) => acc + v['current'],
                0
              ),
              projectInfo.position.reduce(
                (acc: number, v: any) => acc + v['required'],
                0
              ),
            ],
          };
        });
        setProjects([...project]);
      });
  };

  const LoadProject = () => {
    axios
      .get(endpoint, {
        params: {
          page: page.current,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          alert('데이터를 가져오는데 실패했습니다.');
          return false;
        }
        if (response.data.project.length == 0) {
          alert('더 이상 데이터가 없습니다.');
          return false;
        }
        page.current += 1;
        let projectList = response.data.project;
        if (isRecruit) {
          projectList = projectList.filter(
            (prj: any) =>
              !prj.position.reduce(
                (acc: boolean, v: any) => acc && v['current'] === v['required'],
                true
              )
          );
        }
        const project: IProject[] = projectList.map((projectInfo: any) => {
          return {
            id: projectInfo._id,
            title: projectInfo.title,
            thumb: projectInfo.thumb,
            summary: projectInfo.summary,
            field: projectInfo.field,
            receivedLike: projectInfo.receivedLike,
            position: [
              projectInfo.position.reduce(
                (acc: number, v: any) => acc + v['current'],
                0
              ),
              projectInfo.position.reduce(
                (acc: number, v: any) => acc + v['required'],
                0
              ),
            ],
          };
        });
        setProjects([...projects, ...project]);
      });
  };

  const LoadRecommend = () => {
    axios.get(`${PROJECT_SERVER}/recommendList`).then((res) => {
      if (!res.data.success) {
        alert('추천 데이터를 가져오는데 실패했습니다.');
        return false;
      }
      const recommendList = res.data.project
        .filter(
          (prj: any) =>
            !prj.position.reduce(
              (acc: boolean, v: any) => acc && v['current'] === v['required'],
              true
            )
        )
        .slice(0, 5);
      const recommend: IRecommend[] = recommendList.map((item: any) => ({
        id: item._id,
        title: item.title,
        summary: item.summary,
        thumb: item.thumb,
        field: item.field,
      }));
      setRecommends(recommend);
    });
  };

  useEffect(() => {
    refreshProject();
  }, [isRecruit, endpoint]);

  useEffect(() => {
    LoadProject();
    LoadRecommend();
    dispatch(fetchLikeProjects());
  }, []);

  return (
    <Container>
      <InfiniteScroll
        dataLength={projects ? projects.length : 1}
        next={LoadProject}
        hasMore={true}
        loader={<h4></h4>}
      >
        <ProjectHeader setter={setEndpoint} setIsRecruit={setIsRecruit} />
        <ProjectRecommend>
          {recommends &&
            recommends.map((prj) => (
              <ProjectRecommendBox
                id={prj.id}
                key={prj.id}
                title={prj.title}
                description={prj.summary}
                image={prj.thumb}
                category={prj.field}
              />
            ))}
        </ProjectRecommend>
        <ProjectBoxList>
          {projects &&
            projects.map((prj) => (
              <ProjectBox
                key={prj.id}
                id={prj.id}
                title={prj.title}
                description={prj.summary}
                image={prj.thumb}
                state={prj.position}
                category={prj.field}
                receivedLike={prj.receivedLike}
              />
            ))}
        </ProjectBoxList>
      </InfiniteScroll>
    </Container>
  );
};

export default Project;
