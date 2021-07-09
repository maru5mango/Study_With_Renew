import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div`
  background-repeat: no-repeat;
  background-image: url('https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg');
  width: 100%;
  height: 365px;
  background-size: cover;
`;

const TextStyle = styled.div`
  text-align: right;
  padding-top: 7rem;
  padding-right: 5rem;
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.palette.white};
  padding: 0.4rem;
  font-size: 60px;
  font-weight: bolder;
`;

const InfoStyle = styled.p`
  color: ${(props) => props.theme.palette.orange};
  font-size: 1.2rem;
  padding: 0.2rem;
`;

const Title = () => (
  <TitleStyle>
    <TextStyle>
      <MainTitle>
        만들고,
        <br />
        배우고,
        <br />
        협력하라
      </MainTitle>
      <InfoStyle>개발자들의 프로젝트형 스터디 모임</InfoStyle>
    </TextStyle>
  </TitleStyle>
);

export default Title;
