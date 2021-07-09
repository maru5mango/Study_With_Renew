import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li<{ current: boolean }>`
  font-size: 15px;
  flex: 1 1;
  border-top: 1px solid ${(props) => props.theme.palette.lightJade};
  border-right: 1px solid ${(props) => props.theme.palette.lightJade};
  border-bottom: 1px solid ${(props) => props.theme.palette.black};
  border: ${(props) =>
    props.current && `1px solid ${props.theme.palette.black}`};
  border-bottom: ${(props) => props.current && 'none'};
  color: ${(props) =>
    props.current
      ? `${props.theme.palette.gray}`
      : `${props.theme.palette.lightGray}`};
  cursor: pointer;
  background-color: ${(props) => (props.current ? 'transparent' : '#fbfbfb')};
  text-align: center;
`;

const Tab = styled.div`
  padding: 12px 0;
  text-align: center;
`;

interface IProps {
  current: number;
  onClick: (index: number) => void;
}

const ProjectTab = ({ current, onClick }: IProps) => {
  return (
    <Menu>
      <Ul>
        <Li current={current === 0} onClick={() => onClick(0)}>
          <Tab>정보</Tab>
        </Li>
        <Li current={current === 1} onClick={() => onClick(1)}>
          <Tab>질문</Tab>
        </Li>
        <Li current={current === 2} onClick={() => onClick(2)}>
          <Tab>관리</Tab>
        </Li>
      </Ul>
    </Menu>
  );
};

export default ProjectTab;
