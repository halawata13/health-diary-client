import React from 'react';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { blue, grey, orange, red, teal } from "@material-ui/core/colors";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'normal';
  iconOnly?: boolean;
}

export const Button: React.VFC<Props> = props => {
  const { variant, iconOnly, ...buttonProps } = props;

  return (
    <button className={[buttonStyle, props.variant ? `-${props.variant}` : '', props.iconOnly ? `-icon-only` : ''].join(' ')} type="button" {...buttonProps}>{props.children}</button>
  );
};

export const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10rem;
  height: 4.4rem;
  padding: 0 0.8rem;
  border: solid 1px ${variables.colorBorder};
  border-radius: 1rem;
  background-color: #fff;
  font-size: 1.4rem;
  color: ${variables.colorTextDark};
  
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  svg {
    margin-right: 0.4rem;
    font-size: 2rem;
  }
  
  &.-info {
    border-color: ${blue["50"]};
    background-color: ${blue["50"]};
    color: ${blue["900"]};
  }

  &.-success {
    border-color: ${teal["50"]};
    background-color: ${teal["50"]};
    color: ${teal["900"]};
  }

  &.-warning {
    border-color: ${orange["50"]};
    background-color: ${orange["50"]};
    color: ${orange["900"]};
  }

  &.-danger {
    border-color: ${red["50"]};
    background-color: ${red["50"]};
    color: ${red["900"]};
  }

  &.-normal {
    border-color: ${grey["100"]};
    background-color: ${grey["100"]};
  }

  &.-icon-only {
    width: 4.4rem;
    min-width: auto;
    
    svg {
      margin-right: 0;
    }
  }
`;
