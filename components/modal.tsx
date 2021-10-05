import { css } from "@emotion/css";
import { MouseEvent, PropsWithChildren } from 'react';

interface Props {
  show: boolean;
  onBackgroundClicked?: () => void;
}

export const Modal = (props: PropsWithChildren<Props>) => {
  const onBackgroundClicked = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      props.onBackgroundClicked?.();
    }
  };

  return (
    <div className={[containerStyle, props.show ? '-show' : ''].join(' ')} onClick={event => onBackgroundClicked(event)}>
      <div className={contentStyle}>{props.children}</div>
    </div>
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
  min-width: 50rem;
  max-height: 80vh;
`;
