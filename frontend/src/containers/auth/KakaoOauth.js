import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthForm from '../../components/auth/AuthForm';
import { useDispatch } from 'react-redux';
import { loginUser, userInfo } from '../../_actions/user_actions';

const KakaoLoginForm = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios({
    method: 'GET',
    url: '/user/login/kakao',
    params: {
      code: { code },
    },
  }).then(function (res) {
    console.log(res);
    if (res.status == 200) {
      console.log(res.payload.accessToken);
      localStorage.setItem('accessToken', res.payload.accessToken);

      dispatch(userInfo(res.payload.accessToken));
      navigate('/');
    } else if (res.status == 204) {
      console.log(res.payload.accessToken);
      console.log('최초 로그인');
    }
  });

  // const [pwdCfm, setPwdCfm] = useState(true);
  // const [loginloading, setLoginloading] = useState(false);
  // const [regform, setForm] = useState({
  //   userId: '',
  //   userPwd: '',
  // });
  // const onChange = (event) => {
  //   setForm({ ...regform, [event.target.name]: event.target.value });
  // };

  // // useEffect(() => setLoginloading(false), []);

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  // const { userId, userPwd } = regform;

  // let body = {
  //   userId: userId,
  //   userPwd: userPwd,
  // };
  // };

  return (
    <div>
      카카오 로그인 진행 중입니다. <br />
      잠시만 기다려 주세요.
    </div>
  );
};

export default KakaoLoginForm;
