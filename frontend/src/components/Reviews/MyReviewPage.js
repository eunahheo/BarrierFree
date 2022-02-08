import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCardList from './MyCardList';
import { useSelector } from 'react-redux';

const MyReviewPage = () => {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  console.log('myuser', myuser);

  // useEffect(() => {
  //   const fnt = async () => {
  //     try {
  //       const res = await axios({
  //         url: '/myFeed/post',
  //         method: 'get',
  //         params: { userSeq: myuser.userSeq },
  //       });
  //       setItemList(res.data);
  //       console.log(itemList);
  //     } catch (e) {
  //       console.log('myreviewerror', e);
  //     }
  //   };
  //   fnt();
  // }, []);
  useEffect(() => {
    axios({
      url: '/myFeed/post',
      method: 'get',
      params: { userSeq: myuser.userSeq },
    })
      .then(function (res) {
        // console.log(res);
        setItemList(res.data);
        console.log(itemList);
        // console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>My Review in here</div>
      <MyCardList itemList={itemList}></MyCardList>
    </div>
  );
};

export default MyReviewPage;
