import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProjectDtailHeader from '../../../Components/Project/ProjectDetail/ProjectDetailHeader';
import ProjectTab from '../../../Components/Project/ProjectDetail/ProjectTab';
import Info from '../../../Components/Project/ProjectDetail/Info';
import Question from '../../../Components/Project/ProjectDetail/Question';
import RightMenu from '../../../Components/Project/ProjectDetail/RightMenu';
import Management from '../../../Components/Project/ProjectDetail/Management';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PROJECT_SERVER, USER_SERVER } from '../../../Config';

const Container = styled.section``;

const ProjectPageWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const Contents = styled.div`
  max-width: 840px;
  width: 100%;
  padding: 0 0 40px;
  margin: 0;
`;

interface Ipos {
  pos: string;
  required: number;
  current: number;
}

interface IProject {
  _id: string;
  title: string;
  thumb: string;
  info: string;
  field: string;
  area: string;
  position: Ipos[];
  referenceURL: string[];
  startAt: Date;
  endAt: Date;
  writer: string;
  projectLV: string;
  receivedLike: number;
}

const initProject: IProject = {
  _id: '',
  title: '',
  thumb: '',
  info: '',
  field: '',
  area: '',
  position: [],
  referenceURL: [],
  startAt: new Date(),
  endAt: new Date(),
  writer: '',
  projectLV: '',
  receivedLike: 0,
};

interface ILeader {
  _id: string;
  avartarImg: string;
  nickname: string;
  position: string;
  positionLevel: string;
  interestSkills: string[];
  receivedLike: number;
}

const initLeader = {
  _id: '',
  avartarImg: '',
  nickname: '',
  position: '',
  positionLevel: '',
  interestSkills: [],
  receivedLike: 0,
};

const ProjectDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject>(initProject);
  const [leader, setLeader] = useState<ILeader>(initLeader);
  const [recruitment, setRecruitment] = useState(true);
  const userId = useRef(localStorage.getItem('userId'));

  const handleChangeTab = (index: number) => {
    if (currentTab !== index) {
      setCurrentTab(index);
    }
  };

  const cleanup = () => {
    setProject(initProject);
    setLeader(initLeader);
    setRecruitment(true);
  };

  useEffect(() => {
    if (currentTab === 2 && project.writer !== userId.current) {
      alert('접근 권한이 없습니다');
      setCurrentTab(0);
    }
  }, [currentTab]);

  useEffect(() => {
    axios.post(`${PROJECT_SERVER}/info`, { _id: id }).then((res) => {
      if (!res.data.success) {
        alert(`프로젝트 데이터를 가져오는데 실패했습니다 (${res.data.err})`);
        return;
      }
      const {
        _id,
        title,
        thumb,
        info,
        field,
        area,
        position,
        referenceURL,
        startAt,
        endAt,
        writer,
        projectLV,
        receivedLike,
      } = res.data.project;

      setProject({
        _id,
        title,
        thumb,
        info: '',
        field,
        area,
        position,
        referenceURL,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        writer,
        projectLV,
        receivedLike,
      });

      axios.get(`${info}`).then((response) => {
        setProject((prev) => ({ ...prev, info: response.data }));
      });

      setRecruitment(
        !position.reduce(
          (acc: boolean, v: any) => acc && v['current'] === v['required'],
          true
        )
      );

      axios.post(`${USER_SERVER}/info`, { _id: writer }).then((response) => {
        if (!response.data.user) {
          alert(`리더 정보를 가져오는데 실패했습니다 (${response.data.err})`);
          return;
        }
        const {
          _id,
          avartarImg,
          nickname,
          position,
          positionLevel,
          interestSkills,
          receivedLike,
        } = response.data.user;

        setLeader({
          _id,
          avartarImg,
          nickname,
          position,
          positionLevel,
          interestSkills,
          receivedLike,
        });
      });
    });
  }, [currentTab, id]);

  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <Container>
      <ProjectDtailHeader
        field={project.field}
        nickname={leader.nickname}
        recruitment={recruitment}
        avartarImg={leader.avartarImg}
        title={project.title}
      />
      <ProjectPageWrap>
        <Contents>
          <ProjectTab current={currentTab} onClick={handleChangeTab} />
          {currentTab === 0 && (
            <Info
              leaderId={leader._id}
              info={project.info}
              referenceURL={project.referenceURL}
              nickname={leader.nickname}
              position={project.position}
              projectId={id}
              uPos={leader.position}
              uPosLv={leader.positionLevel}
              uInterestSkills={leader.interestSkills}
              uReceivedLike={leader.receivedLike}
              avartarImg={leader.avartarImg}
            />
          )}
          {currentTab === 1 && (
            <Question projectId={id} leaderId={leader._id} />
          )}
          {currentTab === 2 && project.writer === userId.current && (
            <Management projectId={id} leaderId={leader._id} />
          )}
        </Contents>
        <RightMenu
          id={id}
          avartarImg={leader.avartarImg}
          endAt={`${project.endAt.getFullYear()}/${
            project.endAt.getMonth() + 1
          }/${project.endAt.getDate()}`}
          startAt={`${project.startAt.getFullYear()}/${
            project.startAt.getMonth() + 1
          }/${project.startAt.getDate()}`}
          date={`${Math.ceil(
            (project.endAt.getTime() - project.startAt.getTime()) /
              (1000 * 3600 * 24)
          )}`}
          field={project.field}
          nickname={leader.nickname}
          receivedLike={project.receivedLike}
        />
      </ProjectPageWrap>
    </Container>
  );
};

export default ProjectDetail;
