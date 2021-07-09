import React from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs({ type: 'text' })`
  width: 600px;
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
  referencesUrl: Array<string>;
  value: string;
  submitValue: React.Dispatch<React.SetStateAction<Array<string>>>;
  index: number;
}

const ReferenceInput = ({
  placeholder,
  referencesUrl,
  value,
  submitValue,
  index,
}: IProps) => {
  const handleReferenceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newReferences = [...referencesUrl];
    newReferences[index] = value;
    submitValue(newReferences);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => handleReferenceChange(event, index)}
    />
  );
};

export default ReferenceInput;
