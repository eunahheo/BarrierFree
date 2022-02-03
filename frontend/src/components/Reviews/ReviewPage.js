import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendCardList from "../recommend/RecommendCardList";
import Button from "../common/Button";
// import BasicCardList from "../cards/BasicCard";
// import OrderBox from "./OrderBox";
import { Link, useNavigate } from "react-router-dom";

const ReviewPage = () => {
  // const [ordertype, setOrdertype] = useState("");
  const [myitemList, mysetItemList] = useState([]);

  const orderbylatest = async () => {
    // setOrdertype("http://localhost:3000/post/all?userSeq=0");
    await axios.get(`/post/recently?userSeq=0`).then(function (res) {
      mysetItemList(res.data);
      console.log("latest");
    });
  };

  const orderbypopular = () => {
    // setOrdertype("http://localhost:8080/post/scrap?userSeq=1");
    axios({
      url: `/post/scrap?userSeq=1`,
    })
      .then(function (res) {
        mysetItemList(res.data);
        console.log("popular");
      })
      .catch(function () {
        console.log("popular fail");
      });
  };
  const orderbypopularweek = () => {
    axios({
      url: "/post/weekscrap?userSeq=1",
      method: "get",
    })
      .then(function (res) {
        mysetItemList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const orderbybf = () => {
    // setOrdertype("http://localhost:8080/post/follow?userSeq=1");
    axios({
      url: `/post/follow?userSeq=1`,
    }).then(function (res) {
      mysetItemList(res.data);
      console.log("bf");
    });
  };

  useEffect(() => {
    axios({
      url: `/post/all?userSeq=0`,
    }).then(function (res) {
      mysetItemList(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Review in here</h1>
      <Button order onClick={orderbylatest}>
        최신순
      </Button>
      <Button order onClick={orderbypopular}>
        전체 인기순
      </Button>
      <Button order onClick={orderbypopularweek}>
        이번주 인기순
      </Button>
      <Button order onClick={orderbybf}>
        베프만
      </Button>
      {/* <BasicCardList itemList={myitemList}></BasicCardList> */}
      <RecommendCardList itemList={myitemList}></RecommendCardList>
    </div>
  );
};

export default ReviewPage;
