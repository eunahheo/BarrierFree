import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCardList from './ReviewCardList';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ReviewPage.css';

const ReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [myitemList, mysetItemList] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  const orderbylatest = async () => {
    axios({
      method: 'get',
      url: 'main/recently',
      params: {
        userSeq: currentUser,
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
      params: { userSeq: currentUser },
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
      params: { userSeq: currentUser },
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
      console.log('myuserseq', myuser.userSeq);
    } else {
      setCurrentUser(0);
      console.log('myuserseq', myuser);
    }
    const tmp = () => {
      if (myuser) {
        axios({
          method: 'get',
          url: '/main/recently',
          params: {
            userSeq: myuser.userSeq,
          },
        })
          .then(function (res) {
            mysetItemList(res.data);
          })
          .catch((error) => console.log(error));
      } else {
        axios({
          method: 'get',
          url: '/main/recently',
          params: {
            userSeq: 0,
          },
        })
          .then(function (res) {
            mysetItemList(res.data);
          })
          .catch((error) => console.log(error));
      }
    };
    tmp();
  }, [myuser]);

  return (
    <div class="box">
      <h1> </h1>
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
      {myitemList && <ReviewCardList itemList={myitemList}></ReviewCardList>}
    </div>
  );
};

export default ReviewPage;
