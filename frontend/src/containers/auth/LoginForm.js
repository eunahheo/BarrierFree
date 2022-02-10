import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch } from 'react-redux';
import { loginUser, userInfo } from '../../_actions/user_actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pwdCfm, setPwdCfm] = useState(true);
  const [loginloading, setLoginloading] = useState(false);
  const [regform, setForm] = useState({
    userId: '',
    userPwd: '',
  });
  const onChange = (event) => {
    setForm({ ...regform, [event.target.name]: event.target.value });
  };

  useEffect(() => setLoginloading(false), []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const { userId, userPwd } = regform;

    let body = {
      userId: userId,
      userPwd: userPwd,
    };

    if ((userId, userPwd)) {
      setLoginloading(true);
      dispatch(loginUser(body)).then((res) => {
        if (res.payload) {
          if (res.payload.staus === 403) {
            navigate('/registerpage/emailcheck');
          }
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
      onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
      pwdCfm={pwdCfm}
      loading={loginloading}
      // onLogin={onLogin}
    />
  );
};

export default LoginForm;
