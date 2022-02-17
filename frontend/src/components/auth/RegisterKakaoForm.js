import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [regform, setForm] = useState({
    userId: '',
    userNickname: '',
    physical: 0,
    visibility: 0,
    infant: 0,
    senior: 0,
    deaf: 0,
  });

  const onChange = (event) => {
    setForm({ ...regform, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken'); // 카카오 토큰

    event.preventDefault();
    const idExp = /^[a-zA-Z0-9]/;
    const nicknameExp = /^[A-Za-z0-9가-힣_]/;
    // console.log(regform);
    const { userId, userNickname, EnableuserId, EnableuserNickname } = regform;

    // console.log('닉네임 검사:', nicknameExp.test(userNickname));
    // console.log('아이디 유효성 검사::', idExp.test(userId));
    if (idExp.test(userId) === false) {
      alert('아이디는 영어, 숫자만 가능합니다');
      return;
    }
    if (userId.length < 5 || userId.length > 20) {
      alert('아이디는 5~20자 까지만 가능합니다.');
      return;
    }
    if (nicknameExp.test(userNickname) === false) {
      alert('닉네임은 한글,영어,숫자만 가능합니다.');
      return;
    }
    if (userNickname.length < 2 || userNickname.length > 6) {
      alert('닉네임은 2~8자까지만 가능합니다.');
      return;
    }
    if (EnableuserId === false) {
      alert('아이디 중복 여부를 확인해주세요');
      return;
    }
    if (EnableuserNickname === false) {
      alert('닉네임 중복 여부를 확인해주세요');
      return;
    }
    if ((userId, userNickname, EnableuserId, EnableuserNickname)) {
      try {
        await axios({
          url: '/user/join/kakao',
          method: 'post',
          data: regform,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            kakaoToken: `${token}`,
          },
        });
        // console.log('completed');
        alert('카카오 회원가입이 완료되었습니다!😀');
        navigate('/loginpage');
      } catch (error) {
        // console.log(error);
      }
    } else {
      alert('빈 값을 채워주세요!');
    }
  };

  return (
    <AuthForm
      type="registerkakao"
      onChange={onChange}
      onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
    />
  );
};

export default RegisterForm;
