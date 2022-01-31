import React, {useState} from "react";
import { Input, Button, Link } from "@material-ui/core";
import axios from "axios";

const Login = () => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  const onIdHandler = (event) => {
    setId(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      userId: id,
      userPwd: password,
    }

    axios.post('/login', data,
    ).then(res => {
      console.log(res)
    })
  } 
  return (
    <div>
      <h1>로그인</h1> 
      <form onSubmit={onSubmitHandler}>
        <Input placeholder="아이디" onChange={onIdHandler}></Input>
        <br></br>
        <Input placeholder="비밀번호" type="password" onChange={onPasswordHandler}></Input>
        <br></br>
        <Link to="/">아이디 찾기</Link>
        <Link to="/">비밀번호 찾기</Link>
        <Button variant="contained" onClick={onSubmitHandler}>로그인</Button>
        <Button variant="contained">kakao로 로그인</Button>
        <Button variant="contained">회원가입</Button>
      </form>
    </div>
  )
}

export default Login