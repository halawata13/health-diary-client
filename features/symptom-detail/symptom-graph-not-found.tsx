import { css } from '@emotion/css';

export const SymptomGraphNotFound = () => {
  return (
    <div className={container}>データがありません</div>
  );
};

const container = css`
  padding: 1.6rem;
  text-align: center;
  font-size: 1.4rem;
`;
