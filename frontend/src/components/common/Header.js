import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

  h4 {
    cursor: pointer;
  }
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            베리어프리
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <h4>소식함</h4>
          </div>
          <div
            onClick={() => {
              navigate("/recommend");
            }}
          >
            <h4>여행추천</h4>
          </div>
          <div
            onClick={() => {
              navigate("/search");
            }}
          >
            <h4>검색하기</h4>
          </div>
          <div
            onClick={() => {
              navigate("/about");
            }}
          >
            <h4>About</h4>
          </div>
          <div className="right">
            <Link to="/loginpage">
              <Button>로그인</Button>
            </Link>
            <Link to="/registerpage">
              <Button>회원가입</Button>
            </Link>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
