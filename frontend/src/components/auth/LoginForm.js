import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const [pwdCfm, setPwdCfm] = useState(true);
  const navigate = useNavigate();
  const [loginloading, setLoginloading] = useState(false);
  const [regform, setForm] = useState({
    userId: '',
    userPwd: '',
  });
  const onChange = (event) => {
    setForm({ ...regform, [event.target.name]: event.target.value });
  };

  useEffect(() => setLoginloading(false), []);

  const onLogin = async (event) => {
    event.preventDefault();

    const { userId, userPwd } = regform;

    if ((userId, userPwd)) {
      setLoginloading(true);
      try {
        await axios({
          url: '/user/login/',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          data: regform,
        });
        alert('로그인이 완료되었습니다!😀');
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('빈 값을 채워주세요!');
    }
  };

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      // onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
      pwdCfm={pwdCfm}
      loading={loginloading}
      onLogin={onLogin}
    />
  );
};

export default LoginForm;
