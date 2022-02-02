// App.js 내용 가져오면 됨
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Signup() {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <div>
          <input placeholder="아이디를 입력하세요"></input>
          <button type="submit">중복 확인</button>
        </div>
        <div>
          <input placeholder="비밀번호를 입력하세요"></input>
        </div>
        <div>
          <input placeholder="한 번 더 입력하세요"></input>
        </div>
        <button type="submit">회원가입</button>
      </form>
      <Box component="span" sx={{ border: "1px dashed grey" }}>
        <Button>Save</Button>
      </Box>
    </div>
  );
}

export default Signup;
