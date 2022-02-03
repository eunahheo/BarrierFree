import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [regform, setForm] = useState({
    userId: "",
    userNickname: "",
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

    console.log(regform);
    const { userId, userNickname } = regform;

    try {
      await axios({
        url: "http://localhost:8080/user/join/kakao",
        method: "post",
        data: regform,
        // api.defaults.headers["access-token"] = “카카오 access-token”
      });
      console.log("completed");
      alert("회원가입이 완료되었습니다!😀");
      // navigate("/");
    } catch (error) {
      console.log(error);
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
