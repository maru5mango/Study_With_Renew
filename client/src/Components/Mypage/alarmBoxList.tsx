import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.palette.faintGray};
  border-radius: 10px;
  width: 100%;
  flex-direction: column;
  min-height: 340px;
`;
interface IAlamBoxList {
  children: React.ReactNode;
}

function alarmBoxList({ children }: IAlamBoxList) {
  return <Container>{children}</Container>;
}

export default alarmBoxList;
