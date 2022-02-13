import { ImageList } from '@mui/material';
import React from 'react';
import SearchReviewCard from './SearchReviewCard';

const SearchReviewCardList = ({ itemList }) => {
  // console.log(itemList);
  return (
    <div className="RecommendCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <SearchReviewCard item={item} key={item.post_seq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchReviewCardList;
