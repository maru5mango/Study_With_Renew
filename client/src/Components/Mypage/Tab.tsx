import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TabStyle = styled.div`
  width: 100%;
  margin-bottom: 40px;
  margin-top: 40px;
  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }
  a {
    width: 25%;
    border-bottom: 2px solid ${(props) => props.theme.palette.faintGray};
    text-align: center;
    height: 2rem;
    width: 25%;
    color: ${(props) => props.theme.palette.lightGray};
    font-size: 1rem;
  }
  a:hover {
    border-bottom: 2px solid ${(props) => props.theme.palette.black};
    cursor: pointer;
    color: ${(props) => props.theme.palette.gray};
  }
`;

const ActiveStyle = styled.div`
  width: 25%;
  border-bottom: 2px solid ${(props) => props.theme.palette.black} !important;
  text-align: center;
  height: 2rem;
  font-size: 1rem;
  cursor: pointer;
  a {
    color: ${(props) => props.theme.palette.gray};
  }
`;

interface Itab {
  info: boolean;
  project: boolean;
  favorite: boolean;
  alarm: boolean;
}

function Tab({ info, project, favorite, alarm }: Itab) {
  return (
    <TabStyle>
      <ul>
        {info ? (
          <ActiveStyle>
            <Link to="?tab=info">
              <li>정보</li>
            </Link>
          </ActiveStyle>
        ) : (
          <Link to="?tab=info">
            <li>정보</li>
          </Link>
        )}
        {project ? (
          <ActiveStyle>
            <Link to="?tab=project">
              <li>프로젝트</li>
            </Link>
          </ActiveStyle>
        ) : (
          <Link to="?tab=project">
            <li>프로젝트</li>
          </Link>
        )}
        {favorite ? (
          <ActiveStyle>
            <Link to="?tab=favorite">
              <li>구독</li>
            </Link>
          </ActiveStyle>
        ) : (
          <Link to="?tab=favorite">
            <li>구독</li>
          </Link>
        )}
        {alarm ? (
          <ActiveStyle>
            <Link to="?tab=alarm">
              <li>알람</li>
            </Link>
          </ActiveStyle>
        ) : (
          <Link to="?tab=alarm">
            <li>알람</li>
          </Link>
        )}
      </ul>
    </TabStyle>
  );
}

export default Tab;
