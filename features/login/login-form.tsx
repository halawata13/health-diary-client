import { css } from "@emotion/css";
import { variables } from "../../styles/variables";
import { useForm } from 'react-hook-form';
import { inputStyle } from "../../styles/shared/form";
import { Button } from "../../components/button";
import { red } from "@material-ui/core/colors";

interface Props {
  onSubmit: (params: LoginFormParams) => void;
  error: boolean;
}

export interface LoginFormParams {
  username: string;
  password: string;
}

/**
 * ログインフォーム
 */
export const LoginForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormParams>();
  const onSubmit = handleSubmit(data => {
    props.onSubmit(data);
  });

  return (
    <form className={formStyle} onSubmit={onSubmit}>
      <div className={formRowStyle}>
        <label className={formLabelStyle}>ユーザー名</label>
        <div className={formControlStyle}>
          <input type={'text'} {...register('username', { required: true })} className={inputStyle} />
          {props.error && (
            <div className={formErrorStyle}>IDかパスワードが間違っています</div>
          )}
          {errors.username && (
            <div className={formErrorStyle}>ユーザー名を入力してください</div>
          )}
        </div>
      </div>

      <div className={formRowStyle}>
        <label className={formLabelStyle}>パスワード</label>
        <div className={formControlStyle}>
          <input type={'password'} {...register('password', { required: true })} className={inputStyle} />
          {props.error && (
            <div className={formErrorStyle}>IDかパスワードが間違っています</div>
          )}
          {errors.password && (
            <div className={formErrorStyle}>パスワードを入力してください</div>
          )}
        </div>
      </div>

      <div className={buttonContainerStyle}>
        <Button type="submit" variant={'info'}>ログイン</Button>
      </div>
    </form>
  );
};

const formStyle = css`
  width: 50rem;
  padding: 3.2rem 1.6rem;
  box-shadow: ${variables.shadow};
  border-radius: 0.8rem;
  background-color: #fff;
  font-size: 1.4rem;
`;

const formRowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const formControlStyle = css`
  flex-grow: 1;
`;

const formLabelStyle = css`
  width: 15rem;
  margin-right: 1.6rem;
  text-align: right;
`;

const formErrorStyle = css`
  margin-top: 0.4rem;
  color: ${red['900']};
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  padding-top: 0.8rem;
`;
