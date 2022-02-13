import { ImageList } from '@mui/material';
import React from 'react';
import SearchUserCard from './SearchUserCard';

const SearchUserCardList = ({ itemList }) => {
  // console.log(itemList);
  return (
    <div className="RecommendCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <SearchUserCard item={item} key={item.userSeq} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default SearchUserCardList;
