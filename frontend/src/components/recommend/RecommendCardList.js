import { ImageList } from '@mui/material';
import React from 'react';
import RecommendCard from './RecommendCard';

const RecommendCardList = ({ itemList }) => {
  return (
    <div className="RecommendCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <RecommendCard
              addr1={item.addr1}
              contentid={item.contentid}
              firstimage={item.firstimage}
              scrap_yn={item.scrap_yn}
              title={item.title}
              infomationCard={item.contentid}
              key={item.contentid}
            />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default RecommendCardList;
