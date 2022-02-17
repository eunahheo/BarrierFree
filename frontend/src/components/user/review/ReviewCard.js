import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReviewBarrierIcon from './ReviewBarrierIcon';
import { useNavigate } from 'react-router-dom';
import LocationIcon from '@mui/icons-material/LocationOn';

const ReviewCard = ({ item }) => {
  // const pageNum = useState([]);
  const navigate = useNavigate();

  const { postPhoto, postLocation, postTitle, postAlt } = item;
  const barriers = item.impairment;
  const reviewCard = item.postSeq;
  console.log(item);
  // const state = { 'detailnum': reviewCard}
  const onClickCard = () => {
    navigate(`/post/detail/${reviewCard}`);

    // document.location.href = '/detail/'+ reviewCard
  };

  return (
    <div>
      {/* <Link to={{ pathname: '/post/detail/:reviewCard', state: { detailnum : reviewCard}}}> */}
      <Card onClick={onClickCard} reviewCard={reviewCard} sx={{ Width: 320 }}>
        {/* <Card onClick={onClickCard} pageNum={reviewCard} sx={{ maxWidth: 250 }}> */}
        <CardMedia
          component="img"
          height="300"
          image={postPhoto}
          alt={postAlt}
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary" noWrap>
            <LocationIcon sx={{ fontSize: 15 }} /> {postLocation}
          </Typography>
          <Typography noWrap variant="body1">
            {postTitle}
          </Typography>
          <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};
export default ReviewCard;
