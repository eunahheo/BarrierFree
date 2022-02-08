import { ImageList } from '@mui/material';
import React from 'react';
import MyCard from './MyCard';

const MyCardList = ({ itemList }) => {
  // console.log(typeof itemList);
  return (
    <div className="MyCardList">
      <div>
        <span>my card list</span>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <MyCard key={item.postSeq} item={item} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default MyCardList;
