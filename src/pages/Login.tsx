import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import PButton from 'components/member/login/PButton';
import Input from 'components/common/Input';
import theme from 'theme';
import login from 'apis/login';
import { useIsLoginStore } from 'stores/loginStore';
import {
  Body,
  Container,
  Title,
} from 'components/member/memberStyledComponents';
import getUserInfo from 'apis/getUserInfo';
import useUserInfoStore from 'stores/userInfoStore';
import { Link } from 'react-router-dom';
import BaseButton from '../components/common/BaseButton';

const { colors } = theme;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  button {
    margin-right: 0.3rem;
  }
`;

const Separator = styled.span`
  color: ${colors.pointColor};
  margin: 0 0.8rem;
`;

const FailLoginMessage = styled.p`
  color: ${colors.danger};
  margin-bottom: 1rem;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordInputOpen, setIsPasswordInputOpen] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { setIsLoginInStore } = useIsLoginStore(state => state);
  const { userInfo, setUserInfo } = useUserInfoStore(state => state);

  const googleLoginUrl =
    'https://accounts.google.com/o/oauth2/auth?client_id=557076266512-26m0oio1d43tguk02g1fur7umuarvse2.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email%20profile%20openid&access_type=offline';
  const navigate = useNavigate();
  const pathData = {
    email: '',
    password: '',
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickNextBtn = () => {
    setIsPasswordInputOpen(true);
  };

  const fetchUserInfo = async () => {
    try {
      await getUserInfo(email);
      localStorage.setItem('email', email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPasswordInputOpen) {
      setLoginError(
        '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
      );
      if (!password) setLoginError('암호를 입력하세요.');
      if (!email) setLoginError('이메일를 입력하세요.');

      pathData.email = email;
      pathData.password = password;
      try {
        await login(pathData);
        navigate(-1);
        setIsLoginInStore(true);
        fetchUserInfo();
      } catch (error) {
        setFailedLogin(true);
        console.error(error);
      }
    } else {
      setIsPasswordInputOpen(true);
    }
  };

  const handleClickGoogleLogin = () => {
    window.open(googleLoginUrl, '_blank', 'height=600');
  };

  return (
    <Body>
      <Container>
        <Title>로그인</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={handleChangeEmail}
            type="email"
            id="email"
            label="Email"
          />
          {isPasswordInputOpen ? (
            <Input
              value={password}
              onChange={handleChangePassword}
              type="password"
              id="password"
              label="암호"
            />
          ) : null}
          <ButtonGroup>
            {isPasswordInputOpen ? (
              <BaseButton
                color="pointColor"
                size="md"
                disabled={false}
                type="submit"
              >
                로그인
              </BaseButton>
            ) : (
              <BaseButton
                color="pointColor"
                size="md"
                onClick={handleClickNextBtn}
                disabled={false}
              >
                다음
              </BaseButton>
            )}
            <BaseButton
              onClick={handleClickGoogleLogin}
              color="white"
              size="md"
              disabled
            >
              Google 로그인
            </BaseButton>
          </ButtonGroup>
        </Form>

        {failedLogin ? <FailLoginMessage>{loginError}</FailLoginMessage> : null}
        <ButtonGroup>
          <Link to="/findemail">
            <PButton>이메일 찾기</PButton>
          </Link>
          <Separator>|</Separator>
          <Link to="/findpassword">
            <PButton>암호 찾기</PButton>
          </Link>
        </ButtonGroup>
      </Container>
    </Body>
  );
}

export default Login;
