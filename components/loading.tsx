import { Header } from './header';
import { css } from '@emotion/css';

interface Props {
  text?: string;
}

/**
 * ローディング
 */
export const Loading = (props?: Props) => (
  <>
    <Header />
    <main className={containerStyle}>
      <p className={messageStyle}>{props?.text}</p>
    </main>
  </>
);

const containerStyle = css`
  padding: 1em;
  text-align: center;
`;

const messageStyle = css`
  margin: 0 0 2em 0;
`;
