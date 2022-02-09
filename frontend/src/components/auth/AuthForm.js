import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import Physical from '../images/Physical.png';
import PhysicalHide from '../images/PhysicalHide.png';
import Auditory from '../images/Auditory.png';
import AuditoryHide from '../images/AuditoryHide.png';
import Pregnant from '../images/Pregnant.png';
import PregnantHide from '../images/PregnantHide.png';
import Senior from '../images/Senior.png';
import SeniorHide from '../images/SeniorHide.png';
import Visual from '../images/Visual.png';
import VisualHide from '../images/VisualHide.png';
import RegisterForm from '../../containers/auth/RegisterForm';
import axios from 'axios';
import { red } from '@material-ui/core/colors';
import KakaoImage from '../images/kakao_login_large_wide.png';

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

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1.5rem 0.75rem 0;
    cursor: pointer;
  }
  img.active {
    border: 2px solid red;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  outline: none;
  width: 60%;

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
  padding-right: 10px;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
  registerkakao: '카카오회원가입',
};

const AuthForm = ({
  pwdCfm,
  form,
  type,
  onChange,
  onSubmit,
  setForm,
  loading,
  // onLogin,
}) => {
  const onCheckId = async () => {
    // console.log(form.userId.trim().length);
    const idlength = form.userId.trim().length;
    // console.log(typeof idlength);
    if (idlength >= 5 && idlength <= 20) {
      try {
        const response = await axios({
          url: '/user/check/id',
          method: 'post',
          params: { userId: form.userId },
        });
        console.log(response);
        if (response.data == 'success') {
          alert('사용 가능한 아이디입니다!😀');
          setForm({ ...form, EnableuserId: true });
          // console.log("성공!");
          // console.log(form);
        }
      } catch (e) {
        alert('누군가가 사용중인 아이디입니다!😅');
        setForm({ ...form, EnableuserId: false });
        // console.log(e);
        // console.log(form);
      }
    } else if (idlength === 0) {
      alert('빈 값을 입력하셨습니다😅');
      console.log('blank');
    } else {
      alert('5~20자로 입력해주세요!');
    }
  };
  const onCheckNickname = async (event) => {
    // console.log(form.userNickname.trim());
    if (form.userNickname.trim()) {
      try {
        const response = await axios({
          url: '/user/check/nickname',
          method: 'post',
          params: { userNickname: form.userNickname },
        });
        console.log(response);
        if (response.data == 'success') {
          setForm({ ...form, EnableuserNickname: true });
          alert('사용 가능한 닉네임입니다!😀');
          console.log('성공!');
        }
      } catch (e) {
        setForm({ ...form, EnableuserNickname: false });
        alert('누군가가 사용중인 닉네임입니다!😅');
        console.log(e);
      }
    } else {
      alert('빈 값을 입력하셨습니다😅');
      console.log('blank');
    }
  };
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h2>
        <span style={{ color: '#EA5455' }}>베</span>리어{' '}
        <span style={{ color: '#EA5455' }}>프</span>리에 오신 것을 환영합니다!
      </h2>
      <h4>|필수사항|</h4>
      <form onSubmit={onSubmit}>
        <div>
          <StyledInput
            name="userId"
            placeholder="아이디를 입력하세요"
            onChange={onChange}
            value={form.userId}
          />
          {(type === 'register' || type === 'registerkakao') && (
            <Button type="button" onClick={onCheckId}>
              중복 확인
            </Button>
          )}
        </div>
        {type === 'register' && (
          <StyledInput
            name="userEmail"
            placeholder="이메일을 입력하세요"
            type="email"
            onChange={onChange}
            value={form.userEmail}
          />
        )}
        {type !== 'registerkakao' && (
          <StyledInput
            name="userPwd"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            // value={form.userPwd}
          />
        )}
        {type === 'register' && (
          <StyledInput
            name="userPwdCfm"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            onChange={onChange}
            value={form.userPwdCfm}
          />
        )}
        {pwdCfm === false && (
          <p style={{ color: 'red' }}>비밀번호를 확인해주세요</p>
        )}
        {(type === 'register' || type === 'registerkakao') && (
          <StyledInput
            name="userNickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
          />
        )}
        {(type === 'register' || type === 'registerkakao') && (
          <Button type="button" onClick={onCheckNickname}>
            중복 확인
          </Button>
        )}
        {(type === 'register' || type === 'registerkakao') && (
          <AuthBarrierIconBlock>
            <div align="center" className="barriericon">
              <img
                name="physical"
                src={Physical}
                width="30"
                onClick={() => {
                  if (form.physical) {
                    setForm({ ...form, physical: 0 });
                  } else {
                    setForm({ ...form, physical: 1 });
                  }
                }}
              ></img>
              <img
                name="visibility"
                src={Visual}
                width="30"
                onClick={() => {
                  if (form.visibility) {
                    setForm({ ...form, visibility: 0 });
                  } else {
                    setForm({ ...form, visibility: 1 });
                  }
                }}
              ></img>
              <img
                name="deaf"
                src={Auditory}
                width="30"
                onClick={() => {
                  if (form.deaf) {
                    setForm({ ...form, deaf: 0 });
                  } else {
                    setForm({ ...form, deaf: 1 });
                  }
                }}
              ></img>
              <img
                name="infant"
                src={Pregnant}
                width="30"
                onClick={() => {
                  if (form.infant) {
                    setForm({ ...form, infant: 0 });
                  } else {
                    setForm({ ...form, infant: 1 });
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
        {loading === true && type === 'login' && <h4>로그인이 진행중입니다</h4>}
        {loading === true && type === 'register' && (
          <h4>회원가입이 진행중입니다</h4>
        )}
        {type === 'register' && (
          <ButtonWithMarginTop type="submit" cyan fullWidth>
            회원가입
          </ButtonWithMarginTop>
        )}
        {type === 'login' && (
          <ButtonWithMarginTop type="submit" cyan fullWidth>
            로그인
          </ButtonWithMarginTop>
        )}
        {type === 'registerkakao' && (
          <Button kakao fullWidth style={{ marginTop: '1.5rem' }} type="submit">
            kakao로 회원가입
          </Button>
        )}
      </form>
      {type === 'login' && (
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=fa3c898eec92948b420f6f03b934acd1&redirect_uri=http://i6a504.p.ssafy.io:80/kakaologinpage&response_type=code">
          <img src={KakaoImage} id="kakao-login-btn" width="350px" />
        </a>
      )}
      {type === 'register' && (
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=fa3c898eec92948b420f6f03b934acd1&redirect_uri=http://i6a504.p.ssafy.io:80/kakaologinpage&response_type=code">
          <img src={KakaoImage} id="kakao-login-btn" width="350px" />
        </a>
      )}
      {/* {type === 'kakaoOauth' && (
        <div>
          카카오 로그인 진행 중입니다. <br />
          잠시만 기다려 주세요.
        </div>
      )} */}
    </AuthFormBlock>
  );
};

export default AuthForm;
