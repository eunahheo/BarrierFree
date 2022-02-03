import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
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
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// export default function TemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {['left', 'right', 'top', 'bottom'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

const pages = ["소식함", "여행지 추천", "검색하기", "베프란?"];
const settings = ["내 계정 보기", "내 스크랩 보기", "프로필 수정", "로그아웃"];
const Navbar = () => {
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

  // 로그인/로그아웃 분기
  const isLoggedIn = false;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          LOGO
        </Typography>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">소식함</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/recommend");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">여행지 추천</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/search");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">검색하기</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/about");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">베프란?</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNavMenu();
              }}
              sx={{ mr: 30, my: 2, color: "white", display: "block" }}
            >
              소식함2
            </Button>
            <Button
              onClick={() => {
                navigate("/recommend");
                handleCloseNavMenu();
              }}
              sx={{ mr: 30, my: 2, color: "white", display: "block" }}
            >
              여행지 추천
            </Button>
            <Button
              onClick={() => {
                navigate("/search");
                handleCloseNavMenu();
              }}
              sx={{ mr: 30, my: 2, color: "white", display: "block" }}
            >
              검색하기
            </Button>
            <Button
              onClick={() => {
                navigate("/about");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              베프란?
            </Button>

            <Button
              onClick={() => {
                navigate("/loginpage");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              로그인2
            </Button>
            <Button
              onClick={() => {
                navigate("/registerpage");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {/* <Navigate to="/signup" replace={true}> */}
              회원가입
              {/* </Navigate> */}
            </Button>
          </Box>
          {/* 알림 모양 */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={10} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* --알림모양-- */}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
