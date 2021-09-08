import React from 'react';
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const Main: React.VFC<Props> = props => (
  <main className={mainStyle}>{props.children}</main>
);

const mainStyle = css`
  display: flex;
  justify-content: center;
  padding: 1.6rem;
`;
