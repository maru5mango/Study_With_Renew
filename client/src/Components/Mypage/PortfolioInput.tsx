import React from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs({ type: 'text' })`
  width: 450px;
  height: 42px;
  line-height: 0.5;
  font: inherit;
  font-size: 12px;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  color: ${(props) => props.theme.palette.black};
`;

interface IProps {
  placeholder: string;
  portfolioes: Array<string>;
  value: string;
  submitValue: React.Dispatch<React.SetStateAction<Array<string>>>;
  index: number;
}

const PortfolioInput = ({
  placeholder,
  portfolioes,
  value,
  submitValue,
  index,
}: IProps) => {
  const handlePortfolioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newPortfolioes = [...portfolioes];
    newPortfolioes[index] = value;
    submitValue(newPortfolioes);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => handlePortfolioChange(event, index)}
    />
  );
};

export default PortfolioInput;
