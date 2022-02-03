import React, { useEffect, useState } from "react";
import axios from "axios";
// import RecommendCardList from "../recommend/RecommendCardList";
import OrderBox from "./OrderBox";
import MyCardList from "./MyCardList";

const MyReviewPage = () => {
  const [itemList, setItemList] = useState([]);
  // 로그인하면 동적으로 변하게 해야 함
  const userSeq = 3;

  useEffect(() => {
    axios({
      url: `/myFeed/post`,
      method: "get",
      params: { userSeq: userSeq },
    })
      .then(function (res) {
        // console.log(res);
        setItemList(res.data);
        console.log(itemList);
        // console.log(res.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>My Review in here</h1>
      {/* <OrderBox></OrderBox> */}
      {/* <BasicCardList itemList={myitemList}></BasicCardList> */}
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default MyReviewPage;
