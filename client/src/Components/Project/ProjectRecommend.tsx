import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 20px);
  border: 1px solid #9462ef;
  margin: 0 auto 40px;
`;

const Title = styled.p`
  background-color: rgba(160, 107, 255, 0.1);
  padding: 11px 20px 13px;
  color: #935cf7;
  font-size: 1rem;
  font-weight: 700;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 26px 15px;
  white-space: nowrap;
  overflow-x: auto;
`;

interface IProps {
  children: React.ReactNode;
}

const ProjectRecommend = ({ children }: IProps) => {
  return (
    <Container>
      <Title>[추천] 딱! 당신을 기다리는 프로젝트입니다</Title>
      <Contents>{children}</Contents>
    </Container>
  );
};

export default ProjectRecommend;
