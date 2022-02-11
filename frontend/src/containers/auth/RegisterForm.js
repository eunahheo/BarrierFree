import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const [pwdCfm, setPwdCfm] = useState(true);
  const navigate = useNavigate();
  const [registerloading, setRegisterloading] = useState(false);
  const [regform, setForm] = useState({
    userId: '',
    userEmail: '',
    userPwd: '',
    userNickname: '',
    physical: 0,
    visibility: 0,
    infant: 0,
    senior: 0,
    deaf: 0,
    EnableuserId: false,
    EnableuserNickname: false,
  });
  // const [userId, setUserId] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPwd, setUserPwd] = useState("");
  // const [userPwdCfm, setUserPwdCfm] = useState("");
  // const [userNickname, setUserNickname] = useState("");

  const onChange = (event) => {
    // console.log(event.target.value);
    // const { name, value } = event.target;
    setForm({ ...regform, [event.target.name]: event.target.value });
    // console.log(name, value);
    // console.log(regform);
  };

  // const physicalHandler = () => {
  //   setForm({ ...regform, physical: 1 });
  // };
  useEffect(() => setRegisterloading(false), []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const idExp = /^[a-zA-Z0-9]/;
    const regExp =
      /^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*#?&]/;
    const nicknameExp = /^[A-Za-z0-9가-힣_]/;
    console.log(regform);
    const {
      userId,
      userEmail,
      userPwd,
      userPwdCfm,
      userNickname,
      EnableuserId,
      EnableuserNickname,
    } = regform;

    console.log('닉네임 검사:', nicknameExp.test(userNickname));
    console.log('아이디 유효성 검사::', idExp.test(userId));
    console.log('비밀번호 유효성 검사::', regExp.test(userPwd));
    if (idExp.test(userId) === false) {
      alert('아이디는 영어, 숫자만 가능합니다');
      return;
    }
    if (userId.length < 5 || userId.length > 20) {
      alert('아이디는 5~20자 까지만 가능합니다.');
      return;
    }
    if (regExp.test(userPwd) === false) {
      alert('비밀번호는 영어, 숫자, !@#$%^&*를 포함해야합니다.');
      return;
    }
    if (userPwd.length < 8 || userPwd.length > 16) {
      alert('비밀번호는 8자~16자까지만 가능합니다.');
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
    if (
      (userId,
      userEmail,
      userPwd,
      userPwdCfm,
      userNickname,
      EnableuserId,
      EnableuserNickname)
    ) {
      // if (userPwd !== userPwdCfm) {
      //   alert("비밀번호를 다르게 입력했어요!😥");
      //   return;
      // }
      if (userPwd !== userPwdCfm) {
        setPwdCfm(false);
        return;
      } else {
        setPwdCfm(true);
      }
      setRegisterloading(true);
      try {
        await axios({
          url: '/user/join/',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          data: regform,
        });
        alert('회원가입이 완료되었습니다!😀');
        navigate('/registerpage/emailcheck');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('빈 값을 채워주세요!');
    }
  };

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
      pwdCfm={pwdCfm}
      loading={registerloading}
    />
  );
};

export default RegisterForm;
