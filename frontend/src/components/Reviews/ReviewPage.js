import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import Button from "../common/Button";
import MyCardList from "./MyCardList";

const ReviewPage = () => {
  const [itemList, setItemList] = useState([]);

  const orderbylatest = async () => {
    await axios.get(`/main/recently?userSeq=0`).then(function (res) {
      setItemList(res.data);
=======
import ReviewCardList from "./ReviewCardList";
import Button from "../common/Button";
// import BasicCardList from "../cards/BasicCard";
// import OrderBox from "./OrderBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  // const [ordertype, setOrdertype] = useState("");
  const myuser = useSelector((state) => state.user.userData)
  const navigate = useNavigate();
  const [myitemList, mysetItemList] = useState([]);

  const orderbylatest = async () => {
    // setOrdertype("http://localhost:3000/post/all?userSeq=0");
    await axios.get(`/main/recently?userSeq=0`).then(function (res) {
      mysetItemList(res.data);
>>>>>>> 6ed5fed1003d3c7c30a626803bb6027a0ab8aa7b
      console.log("latest");
    });
  };

  const orderbypopular = () => {
    axios({
<<<<<<< HEAD
      url: `/main/scrap?userSeq=1`,
      method: "get",
=======
      url: `/main/scrap?userSeq=0`,
>>>>>>> 6ed5fed1003d3c7c30a626803bb6027a0ab8aa7b
    })
      .then(function (res) {
        setItemList(res.data);
        console.log("popular");
      })
      .catch(function () {
        console.log("popular fail");
      });
  };
  const orderbypopularweek = () => {
    axios({
<<<<<<< HEAD
      url: "/main/weekscrap?userSeq=1",
=======
      url: `/main/weekscrap?userSeq=0`,
>>>>>>> 6ed5fed1003d3c7c30a626803bb6027a0ab8aa7b
      method: "get",
    })
      .then(function (res) {
        setItemList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  // 나중에 고쳐야합니당... !
  const orderbybf = () => {
<<<<<<< HEAD
    axios({
      url: `/main/follow?userSeq=1`,
    }).then(function (res) {
      setItemList(res.data);
      console.log("bf");
    });
  };

  useEffect(() => {
    const res = async () => {
      try {
        await axios({
          url: "/main/all",
          params: {
            userSeq: 0,
          },
        });
        setItemList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
=======
    // setOrdertype("http://localhost:8080/post/follow?userSeq=1");
    if (localStorage) {
      axios({
        url: `/main/follow?userSeq=${myuser.userSeq}`,
      }).then(function (res) {
        mysetItemList(res.data);
        console.log("bf");
      });
    } else {
      alert('로그인이 필요합니다!')
      navigator('/loginpage')
    }
  };

  useEffect(() => {
    axios({
      url: `/main/all?userSeq=0`,
    }).then(function (res) {
      mysetItemList(res.data);
    });
>>>>>>> 6ed5fed1003d3c7c30a626803bb6027a0ab8aa7b
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
<<<<<<< HEAD
      <MyCardList itemList={itemList}></MyCardList>
=======
      {/* <BasicCardList itemList={myitemList}></BasicCardList> */}
      <ReviewCardList itemList={myitemList}></ReviewCardList>
>>>>>>> 6ed5fed1003d3c7c30a626803bb6027a0ab8aa7b
    </div>
  );
};

export default ReviewPage;
