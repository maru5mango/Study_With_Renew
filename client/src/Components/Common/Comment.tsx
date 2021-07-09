import React from 'react';
import styled from 'styled-components';

interface IProps {
  contents: string;
}

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

const Comment = ({ contents }: IProps) => {
  return (
    <Container href={`project/${contents}`}>
      <h2>댓글을 달았어요.</h2>
      <h2>프로젝트에 가서 확인해주세요.</h2>
    </Container>
  );
};

export default Comment;
