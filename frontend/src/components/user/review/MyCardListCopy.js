import { ImageList } from '@mui/material';
import React from 'react';
import MyCard from './MyCard';

const MyCardCopyList = ({ itemList, onRemove }) => {
  return (
    <div className="MyCardList">
      <div>
        <span>here</span>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <MyCard key={item.post_seq} item={item} onRemove={onRemove} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default MyCardCopyList;
