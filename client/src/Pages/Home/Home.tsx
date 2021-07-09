import React, { useEffect } from 'react';
import Title from '../../Components/Common/Title';
import ProjectBoxList from '../../Components/Project/ProjectBoxList';
import ProjectBox from '../../Components/Project/ProjectBox';
import Info from '../../Components/Home/Info';
import styled from 'styled-components';
import PeopleList from '../../Components/People/PeopleList';
import { Ipos } from '../../../../server/models/Project.interface';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeList } from '../../modules/home';
import { fetchLikeProjects, fetchLikeUsers } from '../../modules/like';
import { RootState } from '../../modules';

const Style = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .content {
    margin-bottom: 5rem;
  }
`;

const Home = () => {
  const {
    recentProjects,
    recruitmentProjects,
    newUsers,
    waitUsers,
    loading,
    error,
  } = useSelector((state: RootState) => state.home);

  const dispatch = useDispatch();

  const getCurrentMembers = (positions: Array<Ipos>): number => {
    const currentMembers = positions.map((position: Ipos) => position.current);
    const sumCurrentMembers = currentMembers.reduce((a, b) => a + b);

    return sumCurrentMembers;
  };

  const getRequiredMembers = (positions: Array<Ipos>): number => {
    const requiredMembers = positions.map(
      (position: Ipos) => position.required
    );
    const sumRequiredMembers = requiredMembers.reduce((a, b) => a + b);

    return sumRequiredMembers;
  };

  useEffect(() => {
    dispatch(fetchHomeList());
    dispatch(fetchLikeProjects());
    dispatch(fetchLikeUsers());
  }, []);

  // if (loading) return <div>불러오는 중입니다..</div>;
  if (error) {
    alert(`정보를 받아오지 못했습니다. ${error}`);
  }

  return (
    <Style>
      <Info />
      <ContentWrapper>
        <div className="new_project content">
          <Title subtitle="New Project" title="신규 프로젝트가 나왔어요" />
          <ProjectBoxList>
            {recentProjects && recentProjects.length > 0
              ? recentProjects.map((project) => (
                  <ProjectBox
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    description={project.summary}
                    image={project.thumb}
                    state={[
                      getCurrentMembers(project.position),
                      getRequiredMembers(project.position),
                    ]}
                    category={project.field}
                    receivedLike={project.receivedLike}
                  />
                ))
              : '신규 프로젝트가 없습니다.'}
          </ProjectBoxList>
        </div>
        <div className="join_project content">
          <Title
            subtitle="Study With Us"
            title="모집중인 프로젝트를 둘러봐요"
          />
          <ProjectBoxList>
            {recentProjects && recentProjects.length > 0
              ? recruitmentProjects.map((project) => (
                  <ProjectBox
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    description={project.summary}
                    image={project.thumb}
                    state={[
                      getCurrentMembers(project.position),
                      getRequiredMembers(project.position),
                    ]}
                    category={project.field}
                    receivedLike={project.receivedLike}
                  />
                ))
              : '모집중인 프로젝트가 없습니다.'}
          </ProjectBoxList>
        </div>
        <div className="new_user content">
          <Title subtitle="New Co-Worker" title="가입을 축하드려요" />
          {newUsers && newUsers.length > 0 ? (
            <PeopleList userList={newUsers} />
          ) : (
            '최근 가입한 유저가 없습니다.'
          )}
        </div>
        <div className="find_coworker content">
          <Title subtitle="Be my Co-Worker" title="동료를 찾아보세요" />
          {waitUsers && waitUsers.length > 0 ? (
            <PeopleList userList={waitUsers} />
          ) : (
            '프로젝트 미 참여 중인 유저가 없습니다.'
          )}
        </div>
      </ContentWrapper>
    </Style>
  );
};

export default Home;
