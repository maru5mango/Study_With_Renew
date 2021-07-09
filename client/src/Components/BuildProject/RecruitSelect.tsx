import React from 'react';
import styled from 'styled-components';
import { PosData } from '../../Components/Common/OptionData';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 200px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  padding-left: 20px;
  margin-right: 15px;
  font-size: 12px;
`;

const Option = styled.option`
  text-align: center;
  margin: 1.2rem;
  color: ${(props) => props.theme.palette.gray};
  padding: 0px 2px 1px;
`;

const CountWrapper = styled.div`
  justify-content: center;
  margin: 0 1.5rem;
  font-size: 20px;
`;

const PosCount = styled.span`
  color: ${(props) => props.theme.palette.orange};
  margin: 0 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const PosCountBtn = styled.button`
  background: none;
  border: none;
  user-select: none;
  font-size: 20px;
`;

type Position = {
  pos: string;
  required: number;
  current: number;
};

interface IProps {
  positions: Array<Position>;
  value: Position;
  submitValue: React.Dispatch<React.SetStateAction<Array<Position>>>;
  index: number;
}

const RecruitSelect = ({ positions, value, submitValue, index }: IProps) => {
  const handlePosSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newPositions = [...positions];
    newPositions[index].pos = value;
    submitValue(newPositions);
  };

  const handlePosCountClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const { innerText: type } = event.target as HTMLButtonElement;
    const newPositions = [...positions];

    if (type === '+') {
      newPositions[index].required = newPositions[index].required + 1;
    } else {
      if (newPositions[index].required !== 1) {
        newPositions[index].required = newPositions[index].required - 1;
      }
    }
    submitValue(newPositions);
  };

  return (
    <Wrapper>
      <Select
        value={value.pos}
        onChange={(e) => handlePosSelectChange(e, index)}
      >
        {PosData.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
      <CountWrapper>
        <PosCountBtn onClick={(e) => handlePosCountClick(e, index)}>
          -
        </PosCountBtn>
        <PosCount>{value.required}</PosCount>
        <PosCountBtn onClick={(e) => handlePosCountClick(e, index)}>
          +
        </PosCountBtn>
      </CountWrapper>
    </Wrapper>
  );
};

export default RecruitSelect;
