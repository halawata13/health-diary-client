import { css } from "@emotion/css";
import { PropsWithChildren } from 'react';

export const SectionHeader = (props: PropsWithChildren<{}>) => (
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
