import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardListCopy from './review/MyCardListCopy';
import { useSelector } from 'react-redux';
import { setLoading } from '../../_actions/loading_actions';
import { useParams } from 'react-router';

const UserScrapsIn = ({ getUserHeader }) => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  const params = useParams();
  const currentUser = Number(params.userSeq);

  const [newItemList, setNewItemList] = useState([]);
  const onRemove = (id) => {
    const newItemList = itemList.filter((item) => item.post_seq != id);
    getUserHeader();
    setItemList(newItemList);
  };
  useEffect(() => {
    getUserFeed();
  }, []);
  const getUserFeed = async () => {
    setLoading(true);
    try {
      if (currentUser === myuser.userSeq) {
        axios({
          url: `/myFeed/scrap/post`,
          method: 'get',
          params: { userSeq: myuser.userSeq },
        })
          .then(function (res) {
            setItemList(res.data);
            // console.log('here', typeof itemList[0].post_seq);
          })
          .catch(function (error) {
            // console.log(error);
          });
      } else {
        axios({
          url: `/othersFeed/scrap/post`,
          method: 'get',
          params: { userSeq: myuser.userSeq, otherUserSeq: currentUser },
        })
          .then(function (res) {
            setItemList(res.data);
            // console.log('here', typeof itemList[0].post_seq);
          })
          .catch(function (error) {
            // console.log(error);
          });
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div>
      <h4>소식함 스크랩</h4>
      <hr></hr>
      {itemList.length ? (
        <MyCardListCopy
          itemList={itemList}
          onRemove={onRemove}
        ></MyCardListCopy>
      ) : (
        <h3>스크랩한 소식함이 없습니다</h3>
      )}
    </div>
  );
};

export default UserScrapsIn;
