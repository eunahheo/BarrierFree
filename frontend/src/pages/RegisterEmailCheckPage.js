import AuthTemplate from '../components/auth/AuthTemplate';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const RegisterCompletedPageBlock = styled.div`
  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }
  p {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const ButtonWith = styled(Button)`
  margin-top: 0.5rem;
  width: 90%;
  padding-right: 10px;
`;

const RegisterEmailCheckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userNickname = searchParams.get('userNickname');
  const certified = searchParams.get('certified');

  const location = useLocation();

  useEffect(
    () =>
      axios({
        url: '/user/email/certified',
        method: 'post',
        params: {
          userNickname: userNickname,
          certified: certified,
        },
      }),
    [],
  );

  return (
    <AuthTemplate>
      <RegisterCompletedPageBlock>
        <h1>
          <span style={{ color: '#EA5455' }}>베</span>리어{' '}
          <span style={{ color: '#EA5455' }}>프</span>리에 <br />
          오신 것을 환영합니다!
        </h1>
        <h3>
          현재 <b>가입대기</b> 상태입니다.
        </h3>
        <h3>베리어 프리를 이용하시려면 이메일 인증을 완료해주세요!</h3>
        <Link to="/loginpage">
          <ButtonWith cyan fullWidth>
            로그인
          </ButtonWith>
        </Link>
        <Link to="/">
          <ButtonWith fullWidth cyan style={{ marginTop: '0.5rem' }}>
            메인페이지로 이동
          </ButtonWith>
        </Link>
      </RegisterCompletedPageBlock>
    </AuthTemplate>
  );
};

export default RegisterEmailCheckPage;
