import React, { PropsWithChildren } from 'react';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";

export const Section: React.VFC<PropsWithChildren<{}>> = props => (
  <section className={sectionStyle}>{props.children}</section>
);

const sectionStyle = css`
  width: 100%;
  box-shadow: ${variables.shadow};
  border-radius: 8px;
  background-color: #fff;
`;
