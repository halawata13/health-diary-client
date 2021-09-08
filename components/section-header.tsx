import React from 'react';
import { css } from "@emotion/css";

interface Props {
  children: React.ReactNode;
}

export const SectionHeader: React.VFC<Props> = props => (
  <header className={headerStyle}>{props.children}</header>
);

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  padding: 0 1.6rem;
  border-radius: 8px 8px 0 0;
  background-color: #F1F1F1;
`;
