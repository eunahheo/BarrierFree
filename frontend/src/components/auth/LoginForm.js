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
      dispatch(loginUser(body)).then((res) => {
        console.log(res);
        if (res.payload) {
          localStorage.setItem('accessToken', res.payload.accessToken);
          dispatch(userInfo(res.payload.accessToken));
          navigate('/');
        } else {
          alert('error!');
        }
      });
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
