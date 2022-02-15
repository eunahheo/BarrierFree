import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import ReviewBarrierIcon from './SearchBarrierIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SearchCard = ({ item }) => {
  const { userSeq, userPhoto, userNickname, isfollow } = item;
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.user.userData);

  // 카드를 눌렀을 때 이동
  // const onClickCard = () => {
  //   if (myuser) {
  //     axios({
  //       method: 'GET',
  //       url: 'recommend/detail',
  //       params: { contentid: contentid, userSeq: myuser.userSeq },
  //     }).then(function (res) {
  //       navigate(`/recommend/detail/${contentid}`);
  //     });
  //   } else {
  //     alert('로그인이 필요합니다!😀');
  //   }
  // };

  return (
    <div>
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          onClick={() => {
            navigate(`/user/${userSeq}`);
          }}
          component="img"
          height="200"
          image={userPhoto}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography noWrap variant="body1">
            {userNickname}
          </Typography>
          {/* <ReviewBarrierIcon barriers={impairment}></ReviewBarrierIcon> */}
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchCard;
