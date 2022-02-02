import { ImageList } from "@mui/material";
import React from "react";
import BasicCard from "./BasicCard";

const BasicCardList = (itemList) => {
  return (
    <div className="BasicCardList">
      <div>
        <ImageList cols={4}>
          {itemList.map((item) => (
            <BasicCard item={item} key={item.content_id} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};
export default BasicCardList;
