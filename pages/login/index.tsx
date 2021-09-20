import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserService } from '../../services/user.service';
import { LoginForm, LoginFormParams } from '../../components/login-form';
import { Header } from '../../components/header';
import { Main } from "../../components/main";

/**
 * ログインページ
 */
export default function Index() {
  const router = useRouter();
  const [ error, setError ] = useState(false);

  const onSubmit = async (params: LoginFormParams) => {
    try {
      const user = await UserService.login(params.username, params.password);
      UserService.save(user);

      await router.push('/');

    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <LoginForm onSubmit={onSubmit} error={error} />
      </Main>
    </>
  );
}
