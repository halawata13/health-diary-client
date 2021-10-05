import { PropsWithChildren } from 'react';

const CsrComponent = (props: PropsWithChildren<{}>) => {
  return <>{props.children}</>;
};

export default CsrComponent;
