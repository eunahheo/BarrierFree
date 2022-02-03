import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm = () => {
  const [regform, setForm] = useState({
    userId: "",
    userEmail: "",
    userPwd: "",
    userNickname: "",
    physical: 0,
    visibility: 0,
    infant: 0,
    senior: 0,
    deaf: 0,
  });

  const onChange = (event) => {
    setForm({ ...regform, [event.target.name]: event.target.value });
    // console.log(regform);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(regform);
    const { userId, userEmail, userPwd, userPwdCfm, userNickname } = regform;
    if (userPwd != userPwdCfm) {
      alert("비밀번호를 다르게 입력했어요!😥");
      return;
    }
    await axios({
      url: "/user/join",
      method: "post",
      data: regform,
    })
      .try(alert("회원가입이 완료되었습니다!😀"))
      .catch((error) => console.log(error), console.log("왜안돼?"));
  };

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
    />
  );
};

export default RegisterForm;
