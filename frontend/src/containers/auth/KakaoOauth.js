import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { loginUser, userInfo } from '../../_actions/user_actions';

const KakaoLoginForm = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios({
    method: 'GET',
    url: '/user/login/kakao?code=' + code,
  }).then(function (res) {
    console.log(res);
    if (res.status == 200) {
      console.log(res.data.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken);

      dispatch(userInfo(res.data.accessToken));
      navigate('/');
    } else if (res.status == 202) {
      // 최초 로그인
      // console.log(res.payload.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken); // kakaoAccessToken
      alert('가입된 정보가 없어요! 회원가입 창으로 이동합니다.');
      navigate('/registerpage/kakao');
    }
  });

  return (
    <div>
      <h2>카카오 로그인 진행 중입니다.</h2>
      <h3>잠시만 기다려 주세요.</h3>
    </div>
  );
};

export default KakaoLoginForm;
