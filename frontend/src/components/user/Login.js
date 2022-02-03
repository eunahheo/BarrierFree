import React, {useState} from "react";
import { Input, Button, Link } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_actions";
import { PinDropSharp } from "@mui/icons-material";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    let body = {
      'userId': id,
      'userPwd': password
    }

    dispatch(loginUser(body))
      .then(res => {
        console.log(res)
        if(res.payload) {
          navigate('/')
        } else {
          alert('error!')
        }
      })
    // axios(
    //   {
    //     method: "POST",
    //     url: 'user/login',
    //     data: {
    //       'userId': id,
    //       'userPwd': password
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     if (res.data.message === "success") {
    //       console.log(res)
    //       localStorage.setItem("accessToken", res.data.accessToken);
    //       console.log(localStorage)
    //       setLoginCheck(true);
    //       navigate('/')
    //     }
    //     return res.data;
    //  })
   } 

  return (
    <div>
      <h1>로그인</h1> 
      <form onSubmit={onSubmitHandler}>
        <Input placeholder="아이디" value={id} onChange={onIdHandler}></Input>
        <br></br>
        <Input placeholder="비밀번호" value={password} type="password" onChange={onPasswordHandler}></Input>
        <br></br>
        <Link to="/">아이디 찾기</Link>
        <Link to="/">비밀번호 찾기</Link>
        <Button variant="contained" type="submit">로그인</Button>
        <Button variant="contained">kakao로 로그인</Button>
        <Button variant="contained">회원가입</Button>
      </form>
    </div>
  )
}

export default Login