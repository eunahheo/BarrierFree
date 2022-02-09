import styled from 'styled-components';
import Button from '../common/Button';
import WriteBarrierIcon from '../write/WriteBarrierIcon';

const MyPageContentBlock = styled.div``;

const MyPageContent = ({ user }) => {
  return (
    <MyPageContentBlock>
      <div>
        <h2>| 회원정보 수정 |</h2>
        <h3>아이디 : {user.userId}</h3>
        <h3>닉네임: {user.userNickname}</h3>
        <h3>이메일: {user.userEmail}</h3>
        <h3>
          비밀번호 :{' '}
          <span>
            <Button>비밀번호 변경</Button>
            <WriteBarrierIcon></WriteBarrierIcon>
          </span>
        </h3>
        <Button impact>회원 탈퇴하기</Button>
      </div>
    </MyPageContentBlock>
  );
};

export default MyPageContent;
