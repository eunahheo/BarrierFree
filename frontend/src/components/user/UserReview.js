import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardList from './review/MyCardList';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const UserReview = () => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserReview();
  }, []);

  const getUserReview = async () => {
    try {
      if (currentUser === myuser) {
        const response = await axios({
          url: '/myFeed/post',
          method: 'get',
          params: { userSeq: myuser },
        });
        setItemList(response.data);
      } else {
        const response = await axios({
          url: '/othersFeed/postAll',
          method: 'get',
          params: { otherUserSeq: currentUser, userSeq: myuser },
        });
        setItemList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>userSeq={currentUser}의 게시물</h1>
      {itemList.length > 0 && <MyCardList itemList={itemList}></MyCardList>}
      {itemList.length === 0 && <h1>게시물 없음</h1>}
    </div>
  );
};

export default UserReview;
