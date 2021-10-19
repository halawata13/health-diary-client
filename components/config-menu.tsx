import { useState } from 'react';
import { UserService } from '../services/user.service';
import { useRouter } from 'next/router';
import { css } from "@emotion/css";
import { variables } from "../styles/variables";
import { IoCaretDown, IoPersonCircle } from "react-icons/io5";
import { grey } from "@material-ui/core/colors";

/**
 * 設定メニュー
 */
export const ConfigMenu = () => {
  const router = useRouter();
  const [ open, setOpen ] = useState(false);

  const onLogoutClicked = async () => {
    setOpen(false);
    UserService.delete();
    await router.push('/login');
  };

  return (
    <>
      <div className={[bgStyle, open ? '-open' : ''].join(' ')} onClick={() => setOpen(false)} />
      <div className={containerStyle}>
        <button onClick={() => setOpen(!open)} className={buttonStyle}>
          <IoPersonCircle className={personIconStyle} />
          <IoCaretDown className={caretIconStyle} />
        </button>
        <ul className={[listStyle, open ? '-open' : ''].join(' ')}>
          <li className={itemStyle}>
            <a className={anchorStyle} onClick={() => onLogoutClicked()}>ログアウト</a>
          </li>
        </ul>
      </div>
    </>
  );
};

const bgStyle = css`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;

  &.-open {
    pointer-events: auto;
  }
`;

const containerStyle = css`
  position: relative;
  z-index: 2;
  padding: 0 1.2rem;
`;

const listStyle = css`
  list-style: none;
  position: absolute;
  right: 1.2rem;
  top: 2.8rem;
  z-index: 9;
  width: 20rem;
  padding: 0.8rem 0;
  box-shadow: ${variables.shadow};
  border-radius: 0.6rem;
  background-color: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
  
  &.-open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const itemStyle = css`
  font-size: 1.4rem;
  cursor: pointer;
`;

const anchorStyle = css`
  display: block;
  min-height: 38px;
  padding: 1.2rem 1.6rem;
  text-decoration: none;
  color: #000;
  
  &:hover {
    background-color: ${grey["100"]};
  }
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
`;

const personIconStyle = css`
  font-size: 2.4rem;
  color: ${variables.colorTextDark};
`;

const caretIconStyle = css`
  font-size: 1.4rem;
  color: ${variables.colorTextDark};
`;
