import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillCopyrightCircle } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai';

const FooterContainer = styled.div`
  position: relative;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  padding: 3rem;
  background-color: ${(props) => props.theme.palette.darkblue};
  color: ${(props) => props.theme.palette.white};
  p {
    font-size: 11px;
    line-height: 1.1rem;
    margin-bottom: 0.4rem;
  }
`;

const CopyrightContainer = styled.div`
  width: 200px;
  font-size: 11px;
  padding-top: 1rem;
  text-align: center;
`;

const GithubContainer = styled.a`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.white};
  color: ${(props) => props.theme.palette.darkblue};
  font-size: 30px;
  padding: 0.5rem;
  cursor: pointer;
`;

const OurProfileContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    height: 100%;
    width: 80%;
  }
`;

const Footer = () => (
  <FooterContainer>
    <CopyrightContainer>
      <AiFillCopyrightCircle />
      Create By Team23
    </CopyrightContainer>
    <OurProfileContainer>
      <a href="https://github.com/dhgu-dev" target="_blank" rel="noreferrer">
        <AiFillGithub />
        dhgu-dev
      </a>
      <a href="https://github.com/Yongveloper" target="_blank" rel="noreferrer">
        <AiFillGithub />
        Yongveloper
      </a>
      <a href="https://github.com/maru5mango" target="_blank" rel="noreferrer">
        <AiFillGithub />
        maru5mango
      </a>
    </OurProfileContainer>
    <br />
    <GithubContainer
      href="https://github.com/LM-channel-team-project/team23"
      target="_blank"
    >
      <FiGithub />
    </GithubContainer>
    <p>STUDY_WITH</p>
    <p>Let&apos;s coding and improve your skill</p>
  </FooterContainer>
);
export default Footer;
