import { ImageList } from '@mui/material';
import React from 'react';
import ScrapCard from './ScrapCard';

const ScrapCardList = ({ itemList, onRemove }) => {
  return (
    <div className="MyCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <ScrapCard key={item.contendId} item={item} onRemove={onRemove} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default ScrapCardList;
