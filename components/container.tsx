import React from 'react';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";

interface Props {
  children: React.ReactNode;
}

export const Container: React.VFC<Props> = props => (
  <div className={containerStyle}>{props.children}</div>
);

const containerStyle = css`
  width: 100vw;
  min-height: 100vh;
  background-color: ${variables.colorBackground};
  font-size: 1rem;
`;
