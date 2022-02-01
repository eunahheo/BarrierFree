import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import AuthBarrierIcon from "./AuthBarrierIcon";
import Physical from "../images/Physical.png";
import PhysicalHide from "../images/PhysicalHide.png";
import Auditory from "../images/Auditory.png";
import AuditoryHide from "../images/AuditoryHide.png";
import Pregnant from "../images/Pregnant.png";
import PregnantHide from "../images/PregnantHide.png";
import Senior from "../images/Senior.png";
import SeniorHide from "../images/SeniorHide.png";
import Visual from "../images/Visual.png";
import VisualHide from "../images/VisualHide.png";
import RegisterForm from "./RegisterForm";

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1.5rem 0.75rem 0;
    cursor: pointer;
  }
`;
const AuthFormBlock = styled.div`
  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }
  p {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  outline: none;
  width: 70%;

  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.pink[0]};
  }

  & + & {
    margin-top: 1.5rem;
  }
`;
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

const AuthForm = ({ form, type, onChange, onSubmit, setForm }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h2>베리어 프리에 오신 것을 환영합니다!</h2>
      <p>|필수사항|</p>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="userId"
          placeholder="아이디를 입력하세요"
          onChange={onChange}
          value={form.userId}
        />

        <StyledInput
          name="userEmail"
          placeholder="이메일을 입력하세요"
          type="email"
          onChange={onChange}
          value={form.userEmail}
        />
        <StyledInput
          name="userPwd"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          // value={form.userPwd}
        />
        {type === "register" && (
          <StyledInput
            name="userPwdCfm"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            onChange={onChange}
            value={form.userPwdCfm}
          />
        )}
        {type === "register" && (
          <StyledInput
            name="userNickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
          />
        )}
        {type === "register" && (
          // <AuthBarrierIcon style={{ marginTop: "1rem" }}></AuthBarrierIcon>

          <AuthBarrierIconBlock>
            <div align="center">
              <img
                name="physical"
                src={Physical}
                width="30"
                onClick={() => {
                  if (form.pregnant) {
                    setForm({ ...form, pregnant: 0 });
                  } else {
                    setForm({ ...form, pregnant: 1 });
                  }
                }}
              ></img>
              <img
                name="visual"
                src={Visual}
                width="30"
                onClick={() => {
                  if (form.visual) {
                    setForm({ ...form, visual: 0 });
                  } else {
                    setForm({ ...form, visual: 1 });
                  }
                }}
              ></img>
              <img
                name="auditory"
                src={Auditory}
                width="30"
                onClick={() => {
                  if (form.auditory) {
                    setForm({ ...form, auditory: 0 });
                  } else {
                    setForm({ ...form, auditory: 1 });
                  }
                }}
              ></img>
              <img
                name="pregnant"
                src={Pregnant}
                width="30"
                onClick={() => {
                  if (form.pregnant) {
                    setForm({ ...form, pregnant: 0 });
                  } else {
                    setForm({ ...form, pregnant: 1 });
                  }
                }}
              ></img>
              <img
                name="senior"
                src={Senior}
                width="30"
                onClick={() => {
                  if (form.senior) {
                    setForm({ ...form, senior: 0 });
                  } else {
                    setForm({ ...form, senior: 1 });
                  }
                }}
              ></img>
            </div>
          </AuthBarrierIconBlock>
        )}

        <ButtonWithMarginTop type="submit" cyan fullWidth>
          회원가입
        </ButtonWithMarginTop>
      </form>
      <Button kakao fullWidth style={{ marginTop: "0.5rem" }}>
        kakao로 회원가입
      </Button>
    </AuthFormBlock>
  );
};

export default AuthForm;
