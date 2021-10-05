import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '../services/user.service';

/**
 * 認証
 *
 * @param props
 * @constructor
 */
export const Auth = (props: PropsWithChildren<{}>) => {
  const router = useRouter();
  const user = UserService.load();

  if (!user) {
    router.push('/login');
    return <></>;
  }

  return <>{props.children}</>;
};
