import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const SubtitleStyle = styled.h3`
  padding: 0.2rem;
  color: ${(props) => props.theme.palette.orange};
  font-weight: bold;
  font-size: 1.25rem;
`;

const MaintitleStyle = styled.h2`
  font-size: 2.22rem;
  font-weight: bold;
  line-height: 3.125rem;
  padding: 0.2rem;
  color: ${(props) => props.theme.palette.gray};
`;

interface titleProps {
  subtitle: string;
  title: string;
}

const Title = ({ subtitle, title }: titleProps) => (
  <TitleStyle>
    <SubtitleStyle>{subtitle}</SubtitleStyle>
    <MaintitleStyle>{title}</MaintitleStyle>
  </TitleStyle>
);

export default Title;
