import { ImageList } from '@mui/material';
import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewCardList = ({ itemList }) => {
  return (
    <div className="ReviewCardList">
      <div>
        <h2>reviewcardlist</h2>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <ReviewCard item={item} key={item.postSeq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default ReviewCardList;
