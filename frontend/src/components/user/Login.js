import React from "react";

function Login() {
  return (
    <div>
      <h1>로그인</h1>
      <form>
        <div>
          <input placeholder="아이디를 입력하세요"></input>
        </div>
        <div>
          <input placeholder="비밀번호를 입력하세요"></input>
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
