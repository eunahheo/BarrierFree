import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCardList from './ReviewCardList';
import Button from '../../common/Button';
import { useSelector } from 'react-redux';
import './ReviewPage.css';
import Carousel from './Carousel';

const ReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [myitemList, mysetItemList] = useState([]);
  const [myWeeklyList, setMyWeeklyList] = useState(null);
  const [currentUser, setCurrentUser] = useState(0);

  const orderbylatest = async () => {
    axios({
      method: 'get',
      url: 'main/recently',
      params: {
        userSeq: currentUser,
        page: 1,
        size: 200,
      },
    })
      .then(function (res) {
        mysetItemList(res.data);
        console.log('latest');
      })
      .catch((error) => console.log(error));
  };

  const orderbypopular = () => {
    axios({
      url: '/main/scrap',
      params: { userSeq: currentUser, page: 1, size: 200 },
    })
      .then(function (res) {
        mysetItemList(res.data);
        console.log('popular');
      })
      .catch(function () {
        console.log('popular fail');
      });
  };
  const orderbypopularweek = () => {
    axios({
      url: '/main/weekscrap',
      method: 'get',
      params: { userSeq: currentUser, page: 1, size: 200 },
    })
      .then(function (res) {
        mysetItemList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const orderbybf = () => {
    if (localStorage.accessToken) {
      axios({
        url: '/main/follow',
        method: 'get',
        params: {
          userSeq: myuser.userSeq,
          page: 1,
          size: 200,
        },
      }).then(function (res) {
        mysetItemList(res.data);
        console.log('bf');
      });
    } else {
      alert('로그인이 필요합니다!');
      navigator('/loginpage');
    }
  };

  useEffect(() => {
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
              size: 200,
            },
          });
          // .then(function (res) {
          mysetItemList(response.data);
          // })
          // .catch((error) => console.log(error));

          // console.log('here', response);

          // if (response) {
          // }
          const response2 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: currentUser, page: 1, size: 4 },
          });
          setMyWeeklyList(response2.data);
          // .then(function (res) {
          // })
          // .catch(function (error) {
          // console.log(error);
          // });
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await axios({
            method: 'get',
            url: '/main/recently',
            params: {
              userSeq: 0,
              page: 1,
              size: 200,
            },
          });
          // .then(function (res) {
          mysetItemList(response.data);
          // })
          // .catch((error) => console.log(error));

          console.log('here', response);

          // if (response) {
          // }
          const response2 = await axios({
            url: '/main/weekscrap',
            method: 'get',
            params: { userSeq: 0, page: 1, size: 4 },
          });
          setMyWeeklyList(response2.data);
          // .then(function (res) {
          // })
          // .catch(function (error) {
          // console.log(error);
          // });
          console.log('here', myWeeklyList);
        } catch (e) {
          console.log(e);
        }
      }
    };
    tmp();
  }, [myuser]);
  // console.log('here', myWeeklyList);
  return (
    <div class="box">
      <h1></h1>
      {myWeeklyList ? (
        <div>
          <h1>here</h1>
          <Carousel myWeeklyList={myWeeklyList}></Carousel>
        </div>
      ) : (
        // <Carousel myWeeklyList={myWeeklyList}></Carousel>
        <></>
      )}
      {/* <button>여기야</button> */}
      {/* <Button order onClick={orderbylatest}>
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
      </Button> */}
      <button order onClick={orderbylatest}>
        최신순
      </button>
      <button order onClick={orderbypopular}>
        전체 인기순
      </button>
      <button order onClick={orderbypopularweek}>
        이번주 인기순
      </button>
      <button order onClick={orderbybf}>
        베프만
      </button>

      {myitemList && <ReviewCardList itemList={myitemList}></ReviewCardList>}
    </div>
  );
};

export default ReviewPage;
