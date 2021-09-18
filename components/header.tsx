import React, { memo } from 'react';
import { css } from '@emotion/css';
import { variables } from "../styles/variables";
import { ConfigMenu } from './config-menu';
import { User } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserService } from "../services/user.service";

/**
 * ヘッダ
 */
export const Header = memo(() => {
  const user = UserService.load();
  const router = useRouter();

  return (
    <header className={headerStyle}>
      <div className={leftStyle}>
        <h1 className={titleStyle}>
          <Link href={'/'}><a>Health Diary</a></Link>
        </h1>
        {user && (
          <nav className={navStyle}>
            <Link href={'/'} passHref={true}><a className={[navItemStyle, router.pathname === '/' ? navItemSelectedStyle : ''].join(' ')}>日々の記録</a></Link>
            <Link href={'/symptom'} passHref={true}><a className={[navItemStyle, router.pathname === '/symptom' ? navItemSelectedStyle : ''].join(' ')}>症状の登録</a></Link>
          </nav>
        )}
      </div>
      {user ? <ConfigMenu /> : <div />}
    </header>
  );
});

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 1.6rem;
  box-shadow: ${variables.shadow};
  background-color: #fff;
`;

const leftStyle = css`
  display: flex;
  align-items: flex-end;
`;

const titleStyle = css`
  font-family: "Mulish", sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: ${variables.colorTextDark};
`;

const navStyle = css`
  display: flex;
  column-gap: 20px;
  margin-left: 100px;
  font-size: 1.4rem;
`;

const navItemStyle = css`
  margin-left: 12px;
  color: ${variables.colorTextDark};
`;

const navItemSelectedStyle = css`
  font-weight: bold;
`;
