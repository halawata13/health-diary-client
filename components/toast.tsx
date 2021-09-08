import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../states/toast.state';
import { css } from "@emotion/css";
import { blue, orange, red, teal } from "@material-ui/core/colors";

let hiddenTimer: number;

export const Toast: React.VFC = () => {
  const [ toast, setToast ] = useRecoilState(toastState);

  useEffect(() => {
    if (toast.show) {
      hiddenTimer = window.setTimeout(() => onClick(), 5000);
    }
  }, [toast.show]);

  const typeClass = (() => {
    switch (toast.type) {
      case ToastMessageType.info:
        return '-info';

      case ToastMessageType.success:
        return '-success';

      case ToastMessageType.warning:
        return '-warning';

      case ToastMessageType.error:
        return '-error';
    }
  })();

  const showClass = toast.show ? '-show' : '';

  const onClick = () => {
    clearTimeout(hiddenTimer);
    setToast({
      ...toast,
      show: false,
    });
  };

  return (
    <div className={[messageStyle, typeClass, showClass].join(' ')} onClick={onClick}>{toast.message}</div>
  );
};

const messageStyle = css`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  transform: translateY(100%);
  transition: transform 0.2s ease-out;
  color: #fff;

  &.-info {
    background-color: ${blue["800"]};
  }

  &.-success {
    background-color: ${teal["800"]};
  }

  &.-warning {
    background-color: ${orange["800"]};
  }

  &.-error {
    background-color: ${red["800"]};
  }

  &.-show {
    transform: translateY(0%);
    transition: transform 0.2s ease-out;
  }
`;
