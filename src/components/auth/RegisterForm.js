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

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(regform);
    const { userId, userEmail, userPwd, userPwdCfm, userNickname } = regform;
    // if (userPwd != userPwdCfm) {
    //   alert("비밀번호를 다르게 입력했어요!😥");
    //   return;
    // }
    try {
      await axios({
        url: "http://localhost:8080/user/join/",
        method: "post",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        data: regform,
      });
      // (alert("회원가입이 완료되었습니다!😀"))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm
      // type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={regform}
      setForm={setForm}
    />
  );
};

export default RegisterForm;
