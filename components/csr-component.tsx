import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CsrComponent = (props: Props) => {
  return <>{props.children}</>;
};

export default CsrComponent;
