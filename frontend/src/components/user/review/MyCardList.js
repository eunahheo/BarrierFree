import { ImageList } from '@mui/material';
import React from 'react';
import MyCardCopy from './MyCardCopy';

const MyCardList = ({ itemList }) => {
  return (
    <div className="MyCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <MyCardCopy key={item.post.postSeq} item={item} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default MyCardList;
