import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardListCopy from './review/MyCardListCopy';
import { useSelector } from 'react-redux';

// 백 api 고쳐지면 수정할 것
const UserScrapsIn = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  console.log('myuser', myuser);

  useEffect(() => {
    axios({
      url: `/myFeed/scrap/post`,
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
      <div>My Scraps In</div>
      <MyCardListCopy itemList={itemList}></MyCardListCopy>
    </div>
  );
};

export default UserScrapsIn;
