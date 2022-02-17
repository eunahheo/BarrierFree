import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { logout } from '../../_actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../_actions/user_actions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import DialogContentText from '@mui/material/DialogContentText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MypageBarriersContainer from '../../containers/mypage/MypageBarriersContainer';

const MyPageContentBlock = styled.div``;

const MyPageContent = ({ user }) => {
  const [userPwd, setUserPwd] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userConfirmPwd, setUserConfirmPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    pwdError: '',
    confirmPwdError: '',
    nickError: '',
  });
  const { pwdError, confirmPwdError, nickError } = errorMessage;

  const [pwdFlag, setPassFlag] = useState(false);
  const [confirmFlag, setConfirmFlag] = useState(false);
  const [nickFlag, setNickFlag] = useState(false);

  const regExp = /^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*#?&]/;
  const nicknameExp = /^[A-Za-z0-9가-힣_]/;
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
    if (event.target.name == 'userNickname') {
      const userNickname = event.target.value;
      setUserNickname(userNickname);

      if (userNickname.length < 2 || userNickname.length > 8) {
        setNickFlag(false);
        setErrorMessage({
          ...errorMessage,
          nickError: '닉네임은 2~8자 까지만 가능합니다.',
        });
      } else if (nicknameExp.test(userNickname) === false) {
        setErrorMessage({
          ...errorMessage,
          nickError: '닉네임은 한글,영어,숫자만 가능합니다.',
        });
      } else {
        axios({
          method: 'GET',
          url: '/user/check/nickname',
          params: {
            userNickname: userNickname,
          },
        }).then(function (res) {
          // console.log(res);
          if (res.data == 'success') {
            setNickFlag(true);
            setErrorMessage({
              ...errorMessage,
              nickError: '',
            });
          } else if (res.data == 'fail') {
            setNickFlag(false);
            setErrorMessage({
              ...errorMessage,
              nickError: '다른 사용자가 사용중인 닉네임입니다.',
            });
          }
        });
      }
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [passOpen, setPassOpen] = React.useState(false);
  const [nickOpen, setNickOpen] = React.useState(false);
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
  const handlePassClose = () => {
    setUserPwd('');
    setUserConfirmPwd('');
    setErrorMessage({
      ...errorMessage,
      confirmPwdError: '',
      pwdError: '',
      nickError: '',
    });
    setPassOpen(false);
  };
  const handleNickOpen = () => {
    setNickOpen(true);
  };
  const handleNickClose = () => {
    setUserNickname('');
    setNickOpen(false);
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
        // userNickname: user.userNickname,
        // userPhoto: user.userPhoto,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (res) {
      // console.log(res);
      if (res.status == 200) {
        // console.log(res.data.accessToken);
        alert('비밀번호가 변경되었습니다. ');
        dispatch(userInfo(res.data.accessToken));
        navigate('/');
      } else if (res.status == 400) {
        alert('오류가 발생했어요');
      }
    });
    handlePassClose();
  };
  const updateNick = () => {
    const token = localStorage.getItem('accessToken');
    setNickOpen(true);
    axios({
      method: 'PUT',
      url: '/user/modify',
      data: {
        userSeq: user.userSeq,
        userNickname: userNickname,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (res) {
      // console.log(res);
      if (res.status == 200) {
        // console.log(res.data.accessToken);
        alert('닉네임이 변경되었습니다. ');
        dispatch(userInfo(res.data.accessToken));
        navigate('/');
      } else if (res.status == 400) {
        alert('오류가 발생했어요');
      }
    });
    handleNickClose();
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <Button onClick={handleNickOpen}>닉네임 변경</Button>
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
          <DialogContentText>
            <img
              src="/static/media/barrierfreelogo.32148029a2f50fe67a4a.png"
              width="120"
            ></img>
            <p
              style={{
                marginTop: '0.5rem',
                marginLeft: '0.5rem',
                fontSize: '0.9rem',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              비밀번호를 변경할 수 있습니다.
            </p>
          </DialogContentText>
          {pwdError ? (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                새 비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                color="error"
                margin="dense"
                name="userPwd"
                label="비밀번호"
                fullWidth
                variant="standard"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                value={userPwd}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              >
                {pwdError}
              </span>
            </FormControl>
          ) : (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                새 비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                margin="dense"
                name="userPwd"
                label="비밀번호"
                fullWidth
                variant="standard"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                value={userPwd}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              ></span>
            </FormControl>
          )}
          {confirmPwdError ? (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호 확인
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                color="error"
                margin="dense"
                name="passConfirm"
                label="비밀번호 확인"
                fullWidth
                variant="standard"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                value={userConfirmPwd}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              >
                {confirmPwdError}
              </span>
            </FormControl>
          ) : (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호 확인
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                margin="dense"
                name="passConfirm"
                label="비밀번호 확인"
                fullWidth
                variant="standard"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                value={userConfirmPwd}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              ></span>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={updatePass} disabled={!(confirmFlag && pwdFlag)}>
            비밀번호 변경
          </Button>
          <Button impact onClick={handlePassClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={nickOpen} onClose={handleNickClose}>
        <DialogContent>
          <DialogContentText>
            <img
              src="/static/media/barrierfreelogo.32148029a2f50fe67a4a.png"
              width="120"
            ></img>
            <p
              style={{
                marginTop: '0.5rem',
                marginLeft: '0.5rem',
                fontSize: '0.9rem',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              닉네임을 변경할 수 있습니다.
            </p>
          </DialogContentText>
          {nickError ? (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                닉네임
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                color="error"
                margin="dense"
                name="userNickname"
                label="닉네임"
                fullWidth
                variant="standard"
                onChange={onChange}
                type="text"
                value={userNickname}
                label="Password"
              />
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              >
                {nickError}
              </span>
            </FormControl>
          ) : (
            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                닉네임
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                margin="dense"
                name="userNickname"
                label="닉네임"
                fullWidth
                variant="standard"
                onChange={onChange}
                type="text"
                value={userNickname}
              ></OutlinedInput>
              <span
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'red',
                }}
              ></span>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={updateNick} disabled={!nickFlag}>
            닉네임 변경
          </Button>
          <Button impact onClick={handleNickClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </MyPageContentBlock>
  );
};

export default MyPageContent;
