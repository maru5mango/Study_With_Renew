import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TextAreaStyle = styled.input`
  border-radius: 4px;
  height: 120px;
  width: 290px;
  resize: none;
  overflow-y: auto;
  padding: 0.3rem;
  cursor: pointer;
`;

interface IProps {
  sendNickname: string;
  contents: string;
}

const ChatRequest = ({ sendNickname, contents }: IProps) => {
  return (
    <Link to={`/people/${sendNickname}`}>
      <TextAreaStyle
        placeholder="메세지를 입력해주세요"
        disabled
        value={contents}
      />
    </Link>
  );
};

export default ChatRequest;
