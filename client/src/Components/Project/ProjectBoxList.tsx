import React from 'react';
import styled from 'styled-components';

const ProjectBoxGrid = styled.li`
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 45px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface IProjetBoxList {
  children: React.ReactNode;
}

const ProjectBoxList = ({ children }: IProjetBoxList) => (
  <ProjectBoxGrid>{children}</ProjectBoxGrid>
);

export default ProjectBoxList;
