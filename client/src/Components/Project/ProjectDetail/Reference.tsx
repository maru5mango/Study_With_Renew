import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  margin-top: 20px;
  margin-bottom: 17px;
`;

const A = styled.a`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Li = styled.li`
  display: contents;
`;

const Pinterst = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  margin-right: 14px;
  border-radius: 100px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 30px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 578px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  border-radius: 4px;
  height: 44px;
  padding-left: 20px;
  color: #222;
  padding-top: 0;
`;

interface IProps {
  link: string;
}

const Reference = ({ link }: IProps) => {
  return (
    <Ul>
      <A href={`https://${link}`} target="_blank">
        <Li>
          <Pinterst>
            <Image
              src={`https://icons.duckduckgo.com/ip3/${link}.ico`}
              alt="favicon_image"
            />
          </Pinterst>
          <Input type="text" disabled value={`https://${link}`} />
        </Li>
      </A>
    </Ul>
  );
};

export default Reference;
