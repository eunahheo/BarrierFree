import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCardList from "./ReviewCardList";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [myitemList, mysetItemList] = useState([]);

  const orderbylatest = async () => {
    await axios.get(`/main/recently?userSeq=0`).then(function (res) {
      mysetItemList(res.data);
      console.log("latest");
    });
  };

  const orderbypopular = () => {
    axios({
      url: `/main/scrap?userSeq=0`,
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
      url: `/main/weekscrap?userSeq=0`,
      method: "get",
    })
      .then(function (res) {
        mysetItemList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 나중에 고쳐야합니당... !
  const orderbybf = () => {
    if (localStorage) {
      axios({
        url: "/main/follow",
        method: "get",
        params: {
          userSeq: myuser.userSeq,
        },
      }).then(function (res) {
        mysetItemList(res.data);
        console.log("bf");
      });
    } else {
      alert("로그인이 필요합니다!");
      navigator("/loginpage");
    }
  };

  useEffect(() => {
    axios({
      url: `/main/all?userSeq=0`,
    }).then(function (res) {
      mysetItemList(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Review in here:: reviewpage</h1>
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
      <ReviewCardList itemList={myitemList}></ReviewCardList>
    </div>
  );
};

export default ReviewPage;
