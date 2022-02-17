import { ImageList } from '@mui/material';
import React from 'react';
import SearchCard from './SearchCard';
import './SearchCardList.css';

const SearchCardList = ({ itemList }) => {
  return (
    <div className="RecommendCardList">
      <div class="list">
        <ImageList cols={5}>
          {itemList.map((item) => (
            <SearchCard item={item} key={item.contentid} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchCardList;
