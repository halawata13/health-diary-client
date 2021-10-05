import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { PropsWithChildren } from 'react';

export const Container = (props: PropsWithChildren<{}>) => (
  <div className={containerStyle}>{props.children}</div>
);

const containerStyle = css`
  width: 100vw;
  min-height: 100vh;
  background-color: ${variables.colorBackground};
  font-size: 1rem;
`;
