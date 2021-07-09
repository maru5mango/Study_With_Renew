import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  PosData,
  LevelData,
  LocationData,
  AvailableWeekData,
  AvailableTimeData,
  FieldData,
  ProjectState,
} from './OptionData';

let data: Array<{ value: string; label: string }> = [];

const Select = styled.select`
  width: 200px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  padding-left: 20px;
  margin-right: 15px;
  font-size: 12px;
  appearance: none;
  background-size: 10px 5px;
  background-position: 90%;
  background-repeat: no-repeat;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSA1LjI1bC01LTVoMTBsLTUgNXoiIGZpbGw9IiM0MjQ5NUIiLz48L3N2Zz4=);
`;

const Option = styled.option`
  text-align: center;
  margin: 1.2rem;
  color: ${(props) => props.theme.palette.gray};
  padding: 0px 2px 1px;
`;

interface IProps {
  Mode: string;
  DefaultValue: string;
  SubmitValue: React.Dispatch<React.SetStateAction<string>>;
}
function SelectBox({ Mode, DefaultValue, SubmitValue }: IProps) {
  const [value, setValue] = useState(DefaultValue);

  switch (Mode) {
    case 'level':
      data = LevelData;
      break;
    case 'location':
      data = LocationData;
      break;
    case 'availableWeek':
      data = AvailableWeekData;
      break;
    case 'availableTime':
      data = AvailableTimeData;
      break;
    case 'availableWeek':
      data = AvailableWeekData;
      break;
    case 'pos':
      data = PosData;
      break;
    case 'field':
      data = FieldData;
      break;
    case 'projectState':
      data = ProjectState;
      break;
    default:
      console.log('None');
  }

  const handleChangeSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    setValue(event.currentTarget.value);
    SubmitValue(event.currentTarget.value);
  };
  useEffect(() => {
    setValue(DefaultValue);
  }, [DefaultValue]);
  return (
    <Select name={Mode} value={value} onChange={handleChangeSelect}>
      {data.map((item, index) => (
        <Option key={index} value={item.value} id={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}

export default SelectBox;
