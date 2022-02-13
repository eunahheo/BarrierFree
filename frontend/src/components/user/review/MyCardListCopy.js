import { ImageList } from '@mui/material';
import React from 'react';
import MyCard from './MyCard';

const MyCardCopyList = ({ itemList }) => {
  console.log(itemList);
  return (
    <div className="MyCardList">
      <div>
        <span>my card lisdddt</span>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <MyCard key={item.postSeq} item={item} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default MyCardCopyList;
