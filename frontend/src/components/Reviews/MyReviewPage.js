import React, { useEffect, useState } from "react";
import axios from "axios";
// import RecommendCardList from "../recommend/RecommendCardList";
import OrderBox from "./OrderBox";
import MyCardList from "./MyCardList";
import { useSelector } from "react-redux";

const MyReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  console.log("myuser", myuser);

  const userSeq = 3;

  useEffect(() => {
    axios({
      url: `/myFeed/post`,
      method: "get",
      params: { userSeq: myuser.userSeq },
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
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default MyReviewPage;
