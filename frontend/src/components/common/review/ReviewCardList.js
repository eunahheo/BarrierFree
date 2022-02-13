import { ImageList } from '@mui/material';
import React, { useEffect } from 'react';
import ReviewCard from './ReviewCard';

const ReviewCardList = ({ itemList }) => {
  // const itemLis = itemList;
  // console.log('itemList in reviewCardList', itemList);
  // console.log(itemList.length);
  // console.log(typeof itemList);
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   if (typeof itemList === 'string') {
  //     setItems([]);
  //   } else {
  //     setItems(itemList);
  //   }
  //   if (items.length === 0) {
  //     console.log('items O');

  //     console.log(items);
  //     setItems([]);
  //   } else {
  //     console.log('items X');
  //   }
  // }, []);

  return (
    <div className="ReviewCardList">
      <div>
        <ImageList cols={4}>
          {itemList.length === 0 ? (
            <div>
              <h1>로딩 중...</h1>
            </div>
          ) : (
            itemList.map((item) => (
              // 삭제된 게시글인지 확인
              <ReviewCard item={item} key={item.postSeq} />
            ))
          )}
        </ImageList>
      </div>
    </div>
  );
};
export default ReviewCardList;
