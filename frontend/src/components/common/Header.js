import styled from 'styled-components';
import Responsive from './Responsive';
import MyButton from './Button';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../_actions/user_actions';
import BarrierFreeLogo from '../images/barrierfreelogo.png';
import { initialize } from '../../_actions/write_actions';
import Alarm from './alarm.js';
import { currentinitialize } from '../../_actions/current_actions';
import palette from '../../lib/styles/palette';

const HeaderBox = styled.div`
  display: flex;
  flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;

  font-family: 'KoddiUDOnGothic-Regular';
  .toggle {
    text-align: center;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      color: white;
      cursor: pointer;
    }
    border: 0.3px solid ${palette.gray[0]} 0.8;
  }
`;

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 100;
  font-family: 'KoddiUDOnGothic-Regular';
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

  h4 {
    cursor: pointer;
  }
  .MenuItem {
    color: red;
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
    justify-content: space-between;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = ({ user, onLogout }) => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    dispatch(initialize());
    dispatch(currentinitialize());
  });
  const navigate = useNavigate();
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <img
            src={BarrierFreeLogo}
            width="120"
            className="logo"
            onClick={() => {
              dispatch(initialize());
              window.location.replace('/');
              // navigate('/');
            }}
          ></img>
          <div
            onClick={() => {
              navigate('/');
            }}
          >
            <h4>소식함</h4>
          </div>
          <div
            onClick={() => {
              navigate('/recommend');
            }}
            onClick={() => {
              if (user) {
                navigate('/recommend');
              } else {
                alert('로그인이 필요합니다!🤗');
                navigate('/loginpage');
              }
            }}
          >
            <h4>여행추천</h4>
          </div>
          <div
            onClick={() => {
              if (user) {
                navigate('/search');
              } else {
                alert('로그인이 필요합니다!🤗');
                navigate('/loginpage');
              }
            }}
          >
            <h4>검색하기</h4>
          </div>
          <div
            onClick={() => {
              navigate('/about');
            }}
          >
            <h4>About</h4>
          </div>

          {/* <Alarm></Alarm> */}
          {user ? (
            // 1. 로그인 되어 있을 때

            <div className="right">
              <p
                style={{
                  color: 'black',
                  fontfamily: 'KoddiUDOnGothic-Regular',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {user.userNickname}
              </p>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <HeaderBox>
                      <img src={user.userPhoto} className="toggle"></img>
                    </HeaderBox>
                  </IconButton>
                </Tooltip>
                <Menu
                  style={{ fontFamily: 'KoddiUDOnGothic-Regular' }}
                  // style={{ background: "red" }}
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  src={user.userPhoto}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      navigate(`/user/${user.userSeq}`);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">내 계정 보기</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate('/mypage');
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">프로필 수정</Typography>
                  </MenuItem>

                  {/* 로그인일때 로그인되어잇지 않을 때 분기 */}

                  <MenuItem
                    onClick={() => {
                      navigate('/');
                      dispatch(logout());
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">로그아웃</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          ) : (
            // 2. 로그아웃 상태
            <div className="right">
              <Link to="/loginpage">
                <MyButton>로그인</MyButton>
              </Link>
              <Link to="/registerpage">
                <MyButton>회원가입</MyButton>
              </Link>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
