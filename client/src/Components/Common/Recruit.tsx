import React from 'react';
import styled from 'styled-components';

const Container = styled.a`
  width: 80%;
  height: 120px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.palette.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  contents: string;
}

const Recruit = ({ contents }: IProps) => {
  return (
    <Container href={`/project/${contents}`}>
      지원자는 관리탭에서 확인해주세요.
    </Container>
  );
};

export default Recruit;
