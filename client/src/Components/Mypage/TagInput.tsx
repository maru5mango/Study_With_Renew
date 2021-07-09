import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  min-height: 52px;
  font: inherit;
  font-size: 12px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  padding: 1rem;
  border-radius: 3px;
`;

const Item = styled.li`
  display: inline-block;
  padding: 4px;
  background: ${(props) => props.theme.palette.purple};
  color: ${(props) => props.theme.palette.white};
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  outline: none;
  border: none;
`;

interface IProps {
  placeholder?: string;
  value: string[];
  SubmitValue: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IState {
  items: string[];
  focused: boolean;
  input: string;
}

function TagInput({ placeholder, value, SubmitValue }: IProps) {
  const [state, setState] = useState<IState>({
    items: value,
    focused: false,
    input: '',
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, items: value }));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, input: e.target.value }));
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      if (value[0] === '#') {
        setState((prev) => ({
          ...prev,
          items: [...prev.items, value],
          input: '',
        }));
        SubmitValue((prev) => [...prev, value]);
      }
    }
    if (state.items.length && e.key === 'Backspace' && !state.input.length) {
      setState((prev) => ({
        ...prev,
        items: prev.items.slice(0, state.items.length - 1),
      }));
      SubmitValue((prev) => prev.slice(0, prev.length - 1));
    }
  };
  const handleRemoveItem = (idx: number) => {
    return () => {
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item, i) => i !== idx),
      }));
      SubmitValue((prev) => prev.filter((item, i) => i !== idx));
    };
  };

  return (
    <label>
      <Container>
        {state.items.map((item, i) => (
          <Item key={i} onClick={handleRemoveItem(i)}>
            {item}
            <span>&nbsp;&nbsp;&nbsp;x&nbsp;</span>
          </Item>
        ))}
        <Input
          value={state.input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
        />
      </Container>
    </label>
  );
}

export default TagInput;
