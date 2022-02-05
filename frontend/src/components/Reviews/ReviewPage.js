import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../common/Button";
import MyCardList from "./MyCardList";

const ReviewPage = () => {
  const [itemList, setItemList] = useState([]);

  const orderbylatest = async () => {
    await axios.get(`/main/recently?userSeq=0`).then(function (res) {
      setItemList(res.data);
      console.log("latest");
    });
  };

  const orderbypopular = () => {
    axios({
      url: `/main/scrap?userSeq=1`,
      method: "get",
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
      url: "/main/weekscrap?userSeq=1",
      method: "get",
    })
      .then(function (res) {
        setItemList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const orderbybf = () => {
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
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default ReviewPage;
