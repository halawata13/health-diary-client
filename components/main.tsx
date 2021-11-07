import { css } from "@emotion/css";
import { PropsWithChildren } from 'react';

/**
 * メインコンテナ
 */
export const Main = (props: PropsWithChildren<{}>) => (
  <main className={mainStyle}>{props.children}</main>
);

const mainStyle = css`
  display: flex;
  justify-content: center;
  padding: 1.6rem;
`;
