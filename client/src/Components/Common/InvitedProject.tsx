import React, { useState, useEffect } from 'react';
import { PROJECT_SERVER } from '../../Config';
import axios from 'axios';
import styled from 'styled-components';
import { FieldTransfer } from './transformValue';

const ProjectContainer = styled.div`
  width: 80%;
  border-radius: 16px;
  text-align: center;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.palette.darkblue};
  margin-top: 2rem;
  margin-bottom: 2rem;
  &:hover {
    background-color: ${(props) => props.theme.palette.faintGray};
    border: 1px solid ${(props) => props.theme.palette.lightGray};
  }
`;

interface IProps {
  contents: string;
}

const InvitedProject = ({ contents }: IProps) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [describe, setDescribe] = useState<string>('');
  const [Show, setShow] = useState<boolean>(false);
  useEffect(() => {
    axios.post(`${PROJECT_SERVER}/info`, { _id: contents }).then((res) => {
      if (!res.data.success) {
        alert(`프로젝트 데이터를 가져오는데 실패했습니다 (${res.data.err})`);
        return;
      }
      const { title, field, summary } = res.data.project;
      setTitle(title);
      setCategory(field);
      setDescribe(summary);
      setShow(true);
    });
  }, []);
  return (
    <>
      {Show && (
        <ProjectContainer>
          <a href={`/project/${contents}`}>
            <p>[{FieldTransfer(category)}]</p>
            <h2>
              {title}({describe})
            </h2>
          </a>
        </ProjectContainer>
      )}
    </>
  );
};

export default InvitedProject;
