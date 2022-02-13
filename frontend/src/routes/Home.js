// App.js 내용 가져오면 됨
import ReviewPage from '../components/common/review/ReviewPage';
import Button from '../components/common/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from 'react';
import Icons from '../components/common/Mui';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import palette from '../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import { Navigate } from '../../node_modules/react-router/index';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const CustomIcon = styled('icon')`
  cursor: pointer;
`;

function Home() {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const navigate_wr = () => {
    if (user) {
      navigate('/write');
    } else {
      alert('로그인이 필요합니다!😋');
      navigate('/loginpage');
    }
  };

  return (
    <div className="Home">
      <h1>Home</h1>
      <Container fixed>
        <Grid container>
          <Grid item xs={11}>
            <ReviewPage></ReviewPage>
          </Grid>
          <Grid item xs={1}>
            <CustomIcon>
              <AddCircleRoundedIcon
                className="AddCircleRoundedIcon"
                position="sticky"
                fontSize="large"
                sx={{ color: palette.pink[0] }}
                onClick={navigate_wr}
              />
            </CustomIcon>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
