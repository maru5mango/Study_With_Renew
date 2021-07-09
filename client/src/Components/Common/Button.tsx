import React from 'react';
import styled, { css } from 'styled-components';

type ColorType = 'darkblue' | 'lightGray' | 'red' | 'orange' | 'white';
type SizeType = 'small' | 'medium' | 'large' | 'xLarge';
type ModeType = 'active' | 'disabled';

const ButtonStyle = styled.button<{
  color: ColorType;
  size: SizeType;
  mode?: ModeType;
}>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.palette.darkblue
      : props.theme.palette.white};
  background-color: ${(props) =>
    props.color === 'darkblue'
      ? props.theme.palette.darkblue
      : props.color === 'orange'
      ? props.theme.palette.orange
      : props.color === 'red'
      ? props.theme.palette.red
      : props.color === 'white'
      ? props.theme.palette.white
      : props.theme.palette.lightGray};
  border: ${(props) =>
    props.color === 'white'
      ? `1px solid ${props.theme.palette.darkblue}`
      : 'none'};
  margin: 0.6rem;
  padding: 1rem;
  font: inherit;
  font-size: 12px;
  height: 40px;
  border-radius: 4px;
  text-align: center;
  line-height: 0.5;
  width: 110px;
  cursor: pointer;
  width: ${(props) =>
    props.size === 'xLarge'
      ? '324px'
      : props.size === 'large'
      ? '160px'
      : props.size === 'medium'
      ? '110px'
      : '65px'};
  ${(props) =>
    props.mode == 'disabled' &&
    css`
      cursor: default;
      pointer-events: none;
    `}
`;

interface IProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  ButtonName?: string;
  ButtonColor: ColorType;
  ButtonSize: SizeType;
  ButtonMode: ModeType;
  children?: React.ReactNode;
}
const Button: React.FC<IProps> = ({
  ref,
  ButtonName,
  ButtonColor,
  ButtonSize,
  ButtonMode,
  children,
  ...rest
}: IProps) => {
  const htmlProps = rest as any;
  return (
    <ButtonStyle
      type="button"
      color={ButtonColor}
      size={ButtonSize}
      mode={ButtonMode}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {ButtonName ? ButtonName : children}
    </ButtonStyle>
  );
};

export default Button;
