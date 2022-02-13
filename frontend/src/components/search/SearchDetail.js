import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchCardList from './SearchCardList.js';
import { useNavigate } from '../../../node_modules/react-router/index.js';
import { Container } from '@material-ui/core';

const SearchDetail = ( {number, searchItem } ) => {
  const [searchList, setSearchList] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  const location = useLocation();
  // console.log(location);
  // const number = location.state.number;
  // const searchItem = location.state.searchItem;
  const navigate = useNavigate();

  const getSearchDetail = () => {
    axios({
      methods: 'GET',
      url: '/search',
      params: {
        contentTypeId: number,
        keyword: searchItem,
        page: 0,
        size: 12,
        userSeq: myuser.userSeq,
      },
    }).then((res) => {
      console.log(res);
      setSearchList(res.data);
    });
  };

  useEffect(() => {
    getSearchDetail();
  }, [number]);

  // const onClickToSearch = () => {
  //   navigate('/search');
  // };

  return (
    <Container maxWidth="md">
    <div>
      {/* <p onClick={onClickToSearch}>검색창으로 돌아가기</p> */}
      <SearchCardList itemList={searchList}></SearchCardList>
    </div>
    </Container>
  );
};

export default SearchDetail;
