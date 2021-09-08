import React from 'react';
import { Header } from './header';
import { css } from '@emotion/css';
import { Auth } from './auth';

interface Props {
  text?: string;
}

export const getLoadingComponent = (props?: Props) => (
  <Auth>
    <Header />
    <main className={containerStyle}>
      <p className={messageStyle}>{props?.text}</p>
    </main>
  </Auth>
);

const containerStyle = css`
  padding: 1em;
  text-align: center;
`;

const messageStyle = css`
  margin: 0 0 2em 0;
`;
