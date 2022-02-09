import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardList from './review/MyCardList';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const UserScrapsOut = () => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);

  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    getUserFeed();
  }, []);

  const getUserFeed = async () => {
    setLoading(true);
    try {
      if (currentUser === myuser) {
        const response = await axios({
          method: 'get',
          url: '/myFeed/scrap/recommend',
          params: {
            userSeq: currentUser,
          },
        });
        setItemList(response.data);
      } else {
        // othersfeed scrap 부분 api 없음
        const response = await axios({
          method: 'get',
          url: '/othersFeed/scrap/recommend',
          params: {
            otherUserSeq: currentUser,
            userSeq: myuser,
          },
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
      <div>My Scraps Out</div>
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default UserScrapsOut;
