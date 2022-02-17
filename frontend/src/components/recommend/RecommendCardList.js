import { ImageList } from '@mui/material';
import React from 'react';
import RecommendCard from './RecommendCard';
import './RecommendCardList.css'

const RecommendCardList = ({ itemList }) => {
  return (
    <div className="RecommendCardList">
      <div class="list">
        <ImageList cols={5}>
          {itemList.map((item) => (
            <RecommendCard item={item} key={item.postSeq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default RecommendCardList;
