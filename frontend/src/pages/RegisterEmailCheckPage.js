import AuthTemplate from "../components/auth/AuthTemplate";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const RegisterCompletedPageBlock = styled.div`
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
const RegisterEmailCheckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userNickname = searchParams.get("userNickname");
  const certified = searchParams.get("certified");

  const location = useLocation();

  useEffect(
    () =>
      axios({
        url: "http://localhost:8080/user/email/certified",
        method: "post",
        params: {
          userNickname: userNickname,
          certified: certified,
        },
      }),
    []
  );

  return (
    <AuthTemplate>
      <RegisterCompletedPageBlock>
        <h2>
          <span style={{ color: "#EA5455" }}>베</span>리어{" "}
          <span style={{ color: "#EA5455" }}>프</span>리에 오신 것을 환영합니다!
        </h2>
        <h4>안녕하세요!</h4>
        <p>현재 가입 대기상태입니다.</p>
        <p>베리어 프리를 이용하시려면 인증 메일을 확인해주세요!</p>
        <Link to="/login">
          <Button fullWidth cyan>
            로그인하기
          </Button>
        </Link>
        <Link to="/">
          <Button fullWidth cyan style={{ marginTop: "0.5rem" }}>
            메인페이지로 이동
          </Button>
        </Link>
      </RegisterCompletedPageBlock>
    </AuthTemplate>
  );
};

export default RegisterEmailCheckPage;
