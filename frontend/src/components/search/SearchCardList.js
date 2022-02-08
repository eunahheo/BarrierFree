import { ImageList } from '@mui/material';
import React from 'react';
import SearchCard from './SearchCard';

const SearchCardList = ({ itemList }) => {
  console.log(itemList);
  return (
    <div className="RecommendCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <SearchCard item={item} key={item.contentid} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchCardList;
