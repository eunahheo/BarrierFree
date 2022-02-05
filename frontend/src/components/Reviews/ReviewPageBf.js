import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendCardList from "../recommend/RecommendCardList";
import OrderBox from "./OrderBox";
import { useSelector } from "react-redux";

const ReviewPageBf = () => {
  const [myitemList, mysetItemList] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  useEffect(() => {
    axios({
      url: `http://localhost:3000/post/all`,
      params: {
        userSeq: myuser.userSeq,
      },
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
