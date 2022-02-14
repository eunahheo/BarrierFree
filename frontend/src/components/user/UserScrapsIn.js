import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardListCopy from './review/MyCardListCopy';
import { useSelector } from 'react-redux';

// 백 api 고쳐지면 수정할 것
const UserScrapsIn = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  const [newItemList, setNewItemList] = useState([]);
  console.log('myuser', myuser);
  const onRemove = (id) => {
    const newItemList = itemList.filter((item) => item.post_seq != id);
    setItemList(newItemList);
  };
  useEffect(() => {
    axios({
      url: `/myFeed/scrap/post`,
      method: 'get',
      params: { userSeq: myuser.userSeq },
    })
      .then(function (res) {
        setItemList(res.data);
        console.log('here', typeof itemList[0].post_seq);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
