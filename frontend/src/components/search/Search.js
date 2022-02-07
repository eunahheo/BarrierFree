import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import SearchCardList from './SearchCardList.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Search() {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  // useEffect(() => {
  //   axios({
  //     url: `post/all?userSeq=${myuser.userSeq}`,
  //   }).then(function (res) {
  //     setItemList(res.data);
  //     console.log(myuser.userSeq);
  //   });
  // }, []);

  return (
    <div>
      <Container maxWidth="md">
        <h2>검색하기</h2>
        <hr></hr>
        <SearchCardList itemList={itemList}></SearchCardList>
      </Container>
    </div>
  );
}

export default Search;
