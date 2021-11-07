import { Header } from './header';
import { css } from '@emotion/css';
import { Button } from './button';
import { Section } from './section';
import { Main } from './main';
import { variables } from "../styles/variables";

interface Props {
  text?: string;
}

/**
 * エラー
 */
export const Error = (props: Props) => {
  return (
    <>
      <Header />
      <Main>
        <Section>
          <div className={containerStyle}>
            <p className={messageStyle}>{props.text ?? 'エラーが発生しました'}</p>
            <Button variant={'info'}>トップページに戻る</Button>
          </div>
        </Section>
      </Main>
    </>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 1.6rem 3.2rem;
`;

const messageStyle = css`
  margin: 1em 0 2em 0;
  font-size: 2rem;
  color: ${variables.colorTextDark};
`;
