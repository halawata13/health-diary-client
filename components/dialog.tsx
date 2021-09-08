import React from 'react';
import { useRecoilState } from 'recoil';
import { dialogState, initialDialogState } from '../states/dialog.state';
import { css } from "@emotion/css";
import { teal } from "@material-ui/core/colors";

export const Dialog: React.VFC = () => {
  const [ dialog, setDialog ] = useRecoilState(dialogState);

  const onOkClicked = () => {
    setDialog(initialDialogState);
    dialog.onOkClicked?.();
  };

  const onNgClicked = () => {
    setDialog(initialDialogState);
    dialog.onNgClicked?.();
  };

  return (
    <dialog className={[containerStyle, dialog.show ? '-show' : ''].join(' ')}>
      <section className={contentStyle}>
        <header className={headerStyle}>
          <h1>{dialog.title}</h1>
        </header>
        <main className={mainStyle}>
          <p>{dialog.message}</p>
        </main>
        <footer className={footerStyle}>
          <button className={buttonNGStyle} onClick={onNgClicked}>キャンセル</button>
          <button className={buttonOKStyle} onClick={onOkClicked}>OK</button>
        </footer>
      </section>
    </dialog>
  );
};

const containerStyle = css`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;

  &.-show {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.1s linear;
  }
`;

const contentStyle = css`
  position: relative;
  width: 250px;
  padding: 0 0 60px 0;
  border-radius: 15px;
  background-color: #fff;
`;

const headerStyle = css`
  padding: 1em;
  border-radius: 15px 15px 0 0;
  text-align: center;
  font-weight: bold;
`;

const mainStyle = css`
  margin: 0;
  padding: 0 1em;
`;

const footerStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100%;
  display: flex;
  border-top: solid 1px #CBCBCB;
`;

const buttonStyle = css`
  width: 50%;
`;

const buttonNGStyle = css(buttonStyle, css`
  position: relative;
  color: #666;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #CBCBCB;
  }
`);

const buttonOKStyle = css(buttonStyle, css`
  font-weight: bold;
  color: ${teal["800"]};
`);
