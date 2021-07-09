import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../Common/Title';
import PeopleSearchOption from './PeopleSearchOption';
import { USER_SERVER } from '../../Config';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 0;
`;

interface IProps {
  endpoint: string;
  submitFilter: React.Dispatch<React.SetStateAction<string>>;
}

const PeopleHeader = ({ endpoint, submitFilter }: IProps) => {
  const [filterLoc, setFilterLoc] = useState('');
  const [filterPos, setFilterPos] = useState('');
  const [filterProjectState, setFilterProjectState] = useState('');

  useEffect(() => {
    let query = '';
    if (filterLoc != '') {
      query += `loc=${filterLoc}&`;
    }
    if (filterPos != '' && filterPos != 'none') {
      query += `pos=${filterPos}&`;
    }
    if (filterProjectState == 'P1') {
      query += 'UserState=1';
    }
    if (filterProjectState == 'P2') {
      query += 'UserState=2';
    }
    submitFilter(`${USER_SERVER}?${query}`);
  }, [filterLoc, filterPos, filterProjectState]);

  return (
    <Header>
      <Title subtitle="LET`s with" title="멤버 모집하기" />
      <PeopleSearchOption
        Location={filterLoc}
        Pos={filterPos}
        ProjectState={filterProjectState}
        SubmitLocation={setFilterLoc}
        SubmitPos={setFilterPos}
        SubmitProjectState={setFilterProjectState}
      />
    </Header>
  );
};

export default PeopleHeader;
