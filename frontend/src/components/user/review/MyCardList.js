import { ImageList } from '@mui/material';
import React from 'react';
import MyCardCopy from './MyCardCopy';

const MyCardList = ({ itemList }) => {
  // console.log('여기야', itemList);
  return (
    <div className="MyCardList">
      <div>
        <ImageList cols={4} style={{ whiteSpace: 'nowrap' }}>
          {itemList.map((item) => (
            <MyCardCopy key={item.post.postSeq} item={item} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default MyCardList;
