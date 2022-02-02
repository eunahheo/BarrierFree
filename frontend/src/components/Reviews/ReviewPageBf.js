import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendCardList from "../recommend/RecommendCardList";
import OrderBox from "./OrderBox";

const ReviewPageBf = () => {
  const [myitemList, mysetItemList] = useState([]);

  useEffect(() => {
    axios({
      url: `http://localhost:3000/post/all?userSeq=1`,
    }).then(function (res) {
      mysetItemList(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Review in here</h1>
      <OrderBox></OrderBox>
      {/* <BasicCardList itemList={myitemList}></BasicCardList> */}
      <RecommendCardList itemList={myitemList}></RecommendCardList>
    </div>
  );
};

export default ReviewPageBf;
