import { ImageList } from '@mui/material';
import React from 'react';
import RecommendCard from './RecommendCard';

const RecommendCardList = ({ itemList }) => {
  return (
    <div className="RecommendCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <RecommendCard item={item} key={item.postSeq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default RecommendCardList;
