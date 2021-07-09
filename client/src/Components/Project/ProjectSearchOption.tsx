import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../Common/Checkbox';
import SelectBox from '../Common/SelectBox';
import { PROJECT_SERVER } from '../../Config';

const SearchOption = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 8px;
`;

interface IProps {
  setter: React.Dispatch<React.SetStateAction<string>>;
  setIsRecruit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectSearchOption = ({ setter, setIsRecruit }: IProps) => {
  const [location, setLocation] = useState('A0');
  const [field, setField] = useState('F0');
  const [pos, setPos] = useState('none');
  const [level, setLevel] = useState('level0');
  const [state, setState] = useState(false);
  const handleCheckboxChange = () => {
    setState((prev) => !prev);
  };

  useEffect(() => {
    let query = '';
    if (location !== 'A0') query += `area=${location}&`;
    if (field !== 'F0') query += `field=${field}&`;
    if (pos !== 'none') query += `pos=${pos}&`;
    if (level !== 'level0') query += `level=${level}&`;
    setter(`${PROJECT_SERVER}?${query}`);
    setIsRecruit(state);
  }, [location, field, pos, level, state]);

  return (
    <SearchOption>
      <SelectBox
        Mode="location"
        DefaultValue={location}
        SubmitValue={setLocation}
      />
      <SelectBox Mode="field" DefaultValue={field} SubmitValue={setField} />
      <SelectBox Mode="pos" DefaultValue={pos} SubmitValue={setPos} />
      <SelectBox Mode="level" DefaultValue={level} SubmitValue={setLevel} />
      <Label>
        <Checkbox checked={state} onChange={handleCheckboxChange} />
        <Text>모집중</Text>
      </Label>
    </SearchOption>
  );
};

export default ProjectSearchOption;
