import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";

const HeaderBlock = styled.div``;

const Wrapper = styled(Responsive)``;

const Spacer = styled.div``;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">베리어프리</div>
          <div className="right">
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
    </>
  );
};
