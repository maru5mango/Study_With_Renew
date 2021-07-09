import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';
type ModeType = 'active' | 'disabled';

const InputStyle = styled.input<{
  SizeType: SizeType;
  ModeType: ModeType;
}>`
  width: ${(props) =>
    props.SizeType === 'xs'
      ? '150px'
      : props.SizeType === 's'
      ? '200px'
      : props.SizeType === 'm'
      ? '300px'
      : props.SizeType === 'l'
      ? '400px'
      : '600px'};
  height: 42px;
  line-height: 0.5;
  font: inherit;
  font-size: 12px;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  color: ${(props) => props.theme.palette.black};
  ${(props) =>
    props.ModeType == 'disabled' &&
    css`
      border: 1px solid ${(props) => props.theme.palette.faintGray};
      cursor: default;
      pointer-events: none;
      background-color: ${(props) => props.theme.palette.faintGray};
      color: ${(props) => props.theme.palette.lightGray};
    `}
`;

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IProps extends InputProps {
  InputBoxSize: SizeType;
  InputBoxType: ModeType;
  placeholder?: string;
  value?: string;
  SubmitValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputBox: React.FC<IProps> = ({
  InputBoxSize,
  InputBoxType,
  placeholder,
  value,
  SubmitValue,
}: IProps) => {
  const [inputValue, setInputValue] = useState(value);
  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    SubmitValue(event.currentTarget.value);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <InputStyle
      SizeType={InputBoxSize}
      ModeType={InputBoxType}
      placeholder={placeholder}
      value={inputValue || ''}
      onChange={handleChangeInput}
    />
  );
};

export default InputBox;
