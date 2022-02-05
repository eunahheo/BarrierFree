import styled from "styled-components";
import Responsive from "./Responsive";
import MyButton from "./Button";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HeaderBlock = styled.div`
  position: fixed;
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
    justify-content: space-between;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
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
              <MyButton>로그인</MyButton>
            </Link>
            <Link to="/registerpage">
              <MyButton>회원가입</MyButton>
            </Link>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/user");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">내 계정 보기</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/userpost");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">내 스크랩 보기</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/userpage");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">프로필 수정</Typography>
                </MenuItem>

                {/* 로그인일때 로그인되어잇지 않을 때 분기 */}

                <MenuItem
                  onClick={() => {
                    navigate("/");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
