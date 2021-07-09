import React from 'react';
import styled from 'styled-components';
import ProjectSearchOption from '../../Components/Project/ProjectSearchOption';
import Title from '../Common/Title';

const HeaderContainer = styled.h2`
  display: flex;
  flex-direction: column;
  padding: 40px 10px 24px;
`;

interface IProps {
  setter: React.Dispatch<React.SetStateAction<string>>;
  setIsRecruit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectHeader = ({ setter, setIsRecruit }: IProps) => (
  <HeaderContainer>
    <Title subtitle="Study with us!" title="함께 할 프로젝트 살펴보기" />
    <ProjectSearchOption setter={setter} setIsRecruit={setIsRecruit} />
  </HeaderContainer>
);

export default ProjectHeader;
