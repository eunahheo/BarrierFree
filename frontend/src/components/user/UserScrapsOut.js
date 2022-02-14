import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrapCardList from './review/ScrapCardList';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const UserScrapsOut = () => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);

  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [newItemList, setNewItemList] = useState([]);
  const onRemove = (id) => {
    const newItemList = itemList.filter((item) => item.post_seq != id);
    setItemList(newItemList);
  };

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
        console.log('testing', response.data);
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
      <h4>추천글 스크랩</h4>
      <hr></hr>
      {itemList.length ? (
        <ScrapCardList itemList={itemList} onRemove={onRemove}></ScrapCardList>
      ) : (
        <h3>스크랩한 추천글이 없습니다</h3>
      )}
    </div>
  );
};

export default UserScrapsOut;
