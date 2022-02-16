// App.js 내용 가져오면 됨
import ReviewPage from '../components/common/review/ReviewPage';
import Grid from '@mui/material/Grid';
import React from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import palette from '../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './Home.css';

const CustomIcon = styled('icon')`
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  right: 3%;
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
    <div>
      <Grid item>
        <ReviewPage></ReviewPage>
        <CustomIcon>
          <AddCircleRoundedIcon
            className="AddCircleRoundedIcon"
            position="sticky"
            fontSize="large"
            sx={{ color: palette.pink[0], fontSize: '46px' }}
            onClick={navigate_wr}
          />
        </CustomIcon>
      </Grid>
    </div>
  );
}

export default Home;
