import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './ReviewPage.css';
import Carousel from './Carousel';
import ReviewCardListRecently from './ReviewCardListRecently';
import ReviewCardListScrap from './ReviewCardListScrap';
import ReviewCardListWeekScrap from './ReviewCardListWeekScrap';
import ReviewCardListBf from './ReviewCardListBf';

const ReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [myitemList, mysetItemList] = useState([]);
  const [myWeeklyList, setMyWeeklyList] = useState(null);
  const [carouselList, setCarouselList] = useState(null);
  const [currentUser, setCurrentUser] = useState(0);
  const [reviewtype, setReviewtype] = useState('recently');
  const [recently, setRecently] = useState(false);
  const [bf, setBf] = useState(false);
  const [scrap, setScrap] = useState(false);
  const [weekScrap, setWeekScrap] = useState(false);

  const orderbylatest = async () => {
    setRecently(true);
    setBf(false);
    setScrap(false);
    setWeekScrap(false);

    setReviewtype('recently');
    axios({
      method: 'get',
      url: 'main/recently',
      params: {
        userSeq: currentUser,
        page: 1,
        size: 20,
      },
    })
      .then(function (res) {
        mysetItemList(res.data);
        // console.log('latest');
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const orderbypopular = () => {
    setScrap(true);
    setRecently(false);
    setBf(false);
    setWeekScrap(false);
    setReviewtype('popular');
    axios({
      url: '/main/scrap',
      params: { userSeq: currentUser, page: 1, size: 20 },
    })
      .then(function (res) {
        mysetItemList(res.data);
        // console.log('popular');
      })
      .catch(function () {
        // console.log('popular fail');
      });
  };
  const orderbypopularweek = () => {
    setWeekScrap(true);
    setRecently(false);
    setBf(false);
    setScrap(false);

    setReviewtype('weekscrap');
    axios({
      url: '/main/weekscrap',
      method: 'get',
      params: { userSeq: currentUser, page: 1, size: 20 },
    })
      .then(function (res) {
        mysetItemList(res.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const orderbybf = () => {
    setRecently(false);
    setBf(true);
    setScrap(false);
    setWeekScrap(false);
    setReviewtype('follow');
    if (localStorage.accessToken) {
      axios({
        url: '/main/follow',
        method: 'get',
        params: {
          userSeq: myuser.userSeq,
          page: 1,
          size: 20,
        },
      }).then(function (res) {
        mysetItemList(res.data);
        // console.log('bf');
      });
    } else {
      alert('로그인이 필요합니다!');
      navigator('/loginpage');
    }
  };

  useEffect(() => {
    setRecently(true);
    setBf(false);
    setScrap(false);
    setWeekScrap(false);
    if (myuser) {
      setCurrentUser(myuser.userSeq);
    } else {
      setCurrentUser(0);
    }
    const tmp = async () => {
      if (myuser) {
        try {
          const response = await axios({
            method: 'get',
            url: '/main/recently',
            params: {
              userSeq: myuser.userSeq,
              page: 1,
              size: 20,
            },
          });
          mysetItemList(response.data);

          const response2 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: currentUser, page: 1, size: 4 },
          });
          setMyWeeklyList(response2.data);

          const response3 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: currentUser, page: 1, size: 10 },
          });
          setCarouselList(response3.data);
        } catch (e) {
          // console.log(e);
        }
      } else {
        try {
          const response = await axios({
            method: 'get',
            url: '/main/recently',
            params: {
              userSeq: 0,
              page: 1,
              size: 20,
            },
          });
          mysetItemList(response.data);

          // console.log('here', response);

          const response2 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: 0, page: 1, size: 4 },
          });
          setMyWeeklyList(response2.data);

          const response3 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: 0, page: 1, size: 10 },
          });
          setCarouselList(response3.data);

          // console.log('here', myWeeklyList);
        } catch (e) {
          // console.log(e);
        }
      }
    };
    tmp();
  }, [myuser]);
  return (
    <div data-aos="fade-up" class="box">
      <h1></h1>
      {carouselList ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Carousel myWeeklyList={carouselList} myuser={myuser}></Carousel>
        </div>
      ) : (
        <></>
      )}
      <button className="mybutton" onClick={orderbylatest}>
        최신순
      </button>
      <button className="mybutton" onClick={orderbypopular}>
        전체 인기순
      </button>
      <button className="mybutton" onClick={orderbypopularweek}>
        이번주 인기순
      </button>
      <button className="mybutton" onClick={orderbybf}>
        베프만
      </button>

      {recently && (
        <ReviewCardListRecently className="content"></ReviewCardListRecently>
      )}
      {scrap && <ReviewCardListScrap></ReviewCardListScrap>}
      {weekScrap && <ReviewCardListWeekScrap></ReviewCardListWeekScrap>}
      {bf && <ReviewCardListBf></ReviewCardListBf>}

      {/* {myitemList && (
        <ReviewCardList
          itemList={myitemList}
          reviewtype={reviewtype}
        ></ReviewCardList>
      )} */}
    </div>
  );
};

export default ReviewPage;
