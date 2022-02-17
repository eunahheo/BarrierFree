import { ImageList } from '@mui/material';
import React from 'react';
import SearchReviewCard from './SearchReviewCard';
import './SearchCardList.css'

const SearchReviewCardList = ({ itemList }) => {
  // console.log(itemList);
  return (
    <div className="RecommendCardList">
      <div class="list">
        <ImageList cols={5}>
          {itemList.map((item) => (
            <SearchReviewCard item={item} key={item.post_seq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchReviewCardList;
