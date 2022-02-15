import axios from 'axios';
import React, { useState, Component } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { logout } from '../../_actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { userInfo } from '../../_actions/user_actions';
import MypageBarriersContainer from '../../containers/mypage/MypageBarriersContainer';
import Input from '@mui/material/Input';
import { changeField } from '../../_actions/user_actions';

const MyPageContentBlock = styled.div``;

const MyPageContent = ({ user }) => {
  const [userPwd, setUserPwd] = useState('');
  const [userConfirmPwd, setUserConfirmPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    pwdError: '',
    confirmPwdError: '',
  });
  const { pwdError, confirmPwdError } = errorMessage;

  const [pwdFlag, setPassFlag] = useState(false);
  const [confirmFlag, setConfirmFlag] = useState(false);

  const regExp = /^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*#?&]/;

  const onChange = (event) => {
    if (event.target.name == 'userPwd') {
      const pwd = event.target.value;
      setUserPwd(pwd);

      if (regExp.test(pwd) === false) {
        setPassFlag(false);
        setErrorMessage({
          ...errorMessage,
          pwdError: '비밀번호는 영어, 숫자, !@#$%^&*를 포함해야합니다.',
        });
      } else {
        setPassFlag(true);
        setErrorMessage({
          ...errorMessage,
          pwdError: '',
        });
      }
    }

    if (event.target.name == 'passConfirm') {
      const confirmPwd = event.target.value;
      setUserConfirmPwd(confirmPwd);

      if (userPwd != confirmPwd) {
        setConfirmFlag(false);
        setErrorMessage({
          ...errorMessage,
          confirmPwdError: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        setConfirmFlag(true);
        setErrorMessage({
          ...errorMessage,
          confirmPwdError: '',
        });
      }
    }

    // if (event.target.name == 'userNickname') {
    //   if (event.target.value.length < 2) {
    //     console.log('닉네임은 2자 이상 입력해주세요.');
    //   } else {
    //     console.log('2자 이상입니다.');
    //   }
    // }

    // setForm({ ...regform, [event.target.name]: event.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [passOpen, setPassOpen] = React.useState(false);
  const token = localStorage.getItem('accessToken');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassOpen = () => {
    setPassOpen(true);
  };

  const updatePass = () => {
    const token = localStorage.getItem('accessToken');
    setPassOpen(true);
    axios({
      method: 'PUT',
      url: '/user/modify',
      data: {
        userSeq: user.userSeq,
        userPwd: userPwd,
        userNickname: user.userNickname,
        userPhoto: user.userPhoto,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (res) {
      console.log(res);
      if (res.status == 200) {
        // console.log(res.data.accessToken);
        dispatch(userInfo(res.data.accessToken));
        navigate('/');
      } else if (res.status == 400) {
        alert('오류가 발생했어요');
      }
    });
    handlePassClose();
  };

  const handlePassClose = () => {
    setUserPwd('');
    setUserConfirmPwd('');
    setErrorMessage({
      ...errorMessage,
      confirmPwdError: '',
      pwdError: '',
    });
    setPassOpen(false);
  };

  const withdrawUser = () => {
    // 회원 탈퇴하기

    axios({
      method: 'PUT',
      url: '/user/withdraw',
      params: {
        userSeq: user.userSeq,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (res) {
      // console.log(res);
      if (res.status == 200) {
        navigate('/'); // 메인으로 이동
        dispatch(logout()); // 로그아웃 처리
      } else if (res.status == 400) {
        alert('오류가 발생했습니다.');
      }
    });
  };
  const nicknameExp = /^[A-Za-z0-9가-힣_]/;
  const [nickError, setNickError] = useState(null);
  const changeNickname = async () => {
    if (nicknameExp.test(myNickname) === false) {
      setNickError('닉네임은 한글,영어,숫자만 가능합니다');
    } else if (myNickname.length < 2 || myNickname.length > 8) {
      setNickError('닉네임은 2~8자 까지만 가능합니다');
    } else {
      try {
        setNickError(null);
        const response = await axios({
          method: 'put',
          url: '/user/modify',
          data: {
            userSeq: user.userSeq,
            userNickname: myNickname,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        await dispatch(changeField({ key: 'userNickname', value: myNickname }));
        alert('닉네임 변경이 완료되었습니다!');
      } catch (e) {
        console.log(e);
      }
    }
  };
  const [myNickname, setMyNickname] = useState(user.userNickname);
  const [nickCheck, setNickCheck] = useState(false);
  const onNickChange = (event) => {
    setMyNickname(event.target.value);
  };
  const onClickCancel = () => {
    setNickCheck(false);
    setMyNickname(user.userNickname);
    setNickError('     ');
  };

  // Barrier 변경
  const { deaf, infant, physical, senior, visibility } = useSelector(
    ({ write }) => ({
      deaf: write.deaf,
      infant: write.infant,
      physical: write.physical,
      senior: write.senior,
      visibility: write.visibility,
    }),
  );
  const changeBF = () => {
    axios({
      method: 'put',
      url: '/user/updateImpairment',
      data: {
        deaf,
        infant,
        physical,
        senior,
        visibility,
      },
      params: { userSeq: user.userSeq },
    }).then(alert('변경 완료!'));
  };
  return (
    <MyPageContentBlock>
      <div>
        <br />
        <br />
        <h3>아이디 : {user.userId}</h3>
        <h3>
          닉네임:
          <span>
            {nickCheck ? (
              <span>
                <Input
                  value={myNickname}
                  sx={{ width: '50%' }}
                  onChange={onNickChange}
                />
                <Button onClick={changeNickname}>저장</Button>
                <Button onClick={onClickCancel}>취소</Button>
                <br></br>
                <h4 style={{ fontSize: '15px', color: 'red' }}>{nickError}</h4>
              </span>
            ) : (
              <span>
                {user.userNickname}
                <Button onClick={() => setNickCheck(true)}>닉네임 변경</Button>
              </span>
            )}
          </span>
        </h3>
        <h3>이메일: {user.userEmail}</h3>
        <h3>
          비밀번호 :{' '}
          <span>
            <Button onClick={handlePassOpen}>비밀번호 변경</Button>
            <MypageBarriersContainer></MypageBarriersContainer>
            <Button onClick={changeBF}>베리어 변경</Button>
          </span>
        </h3>
        <Button impact onClick={handleClickOpen}>
          회원 탈퇴하기
        </Button>
      </div>

      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ margin: 'auto' }}>
          <h3> 베리어 프리를</h3>
          <h3>탈퇴하실 건가요?</h3> 아쉬워요😢
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>잘못 눌렀어요</Button>
          <Button impact onClick={withdrawUser} autoFocus>
            탈퇴할게요
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={passOpen} onClose={handlePassClose}>
        <DialogContent>
          {/* <DialogContentText>비밀번호 변경</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            name="userPwd"
            label="비밀번호"
            type="password"
            fullWidth
            value={userPwd}
            variant="standard"
            onChange={onChange}
          />
          {pwdError ? <p>{pwdError}</p> : ''}
          <TextField
            id="passConfirm"
            name="passConfirm"
            label="비밀번호 확인"
            value={userConfirmPwd}
            type="password"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          {confirmPwdError ? <p>{confirmPwdError}</p> : ''}
        </DialogContent>
        <DialogActions>
          <Button impact onClick={handlePassClose}>
            취소
          </Button>
          <Button onClick={updatePass} disabled={!(confirmFlag && pwdFlag)}>
            비밀번호 변경
          </Button>
        </DialogActions>
      </Dialog>
    </MyPageContentBlock>
  );
};

export default MyPageContent;
