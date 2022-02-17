import { ImageList } from '@mui/material';
import React from 'react';
import SearchUserCard from './SearchUserCard';
import './SearchCardList.css';

const SearchUserCardList = ({ itemList }) => {
  return (
    <div className="RecommendCardList">
      <div class="list">
        <ImageList cols={5}>
          {itemList.map((item) => (
            <SearchUserCard item={item} key={item.userSeq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchUserCardList;
