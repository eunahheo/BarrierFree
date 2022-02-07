import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardList from './MyCardList';
import { useSelector } from 'react-redux';

const UserScrapsOut = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  console.log('myuser', myuser);

  useEffect(() => {
    axios({
      url: `/myFeed/scrap/recommend`,
      method: 'get',
      params: { userSeq: myuser.userSeq },
    })
      .then(function (res) {
        // console.log(res);
        setItemList(res.data);
        console.log(itemList);
        // console.log(res.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>My Scraps Out</div>
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default UserScrapsOut;
