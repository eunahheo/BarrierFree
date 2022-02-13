import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useNavigate } from '../../../node_modules/react-router/index.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Search.css';
import SearchList from './SearchList';
import Button from '../common/Button';
import SearchDetail from './SearchDetail';

function Search() {
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.user.userData);
  const [findSearch, setFindSearch] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [searchReivewList, setSearchReivewList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [searchPartyList, setSearchPartyList] = useState([]);
  const [noresult, setNoresult] = useState('');
  const [handsearch, setHandsearch] = useState(false);
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');

  const onSearchHandler = (event) => {
    setSearchItem(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSearchUserList([]);
    setSearchLocationList([]);
    setSearchFoodList([]);
    setSearchReivewList([]);
    setSearchHomeList([]);
    setSearchPartyList([]);
    if (searchItem) {
      setHandsearch(true);
      axios({
        method: 'GET',
        url: '/search/post',
        params: {
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        setSearchReivewList(res.data);
      });

      axios({
        method: 'GET',
        url: '/search/user',
        params: {
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setSearchUserList(res.data);
        } else {
          setNoresult('검색 내용이 없습니다 😥');
        }
      });

    const impairmentNums = [12, 39, 32, 15];
    
    for (var i = 0; i < impairmentNums.length; i++)
      axios({
        method: 'GET',
        url: '/search/tour',
        params: {
          contentTypeId: impairmentNums[i],
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        console.log(res)
        if (res.config.params.contentTypeId === 12) {
          if (res.data.length > 0) {
            setSearchLocationList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          } 
        } else if (res.config.params.contentTypeId === 39) {
          if (res.data.length > 0) {
            setSearchFoodList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        } else if (res.config.params.contentTypeId === 32) {
          if (res.data.length > 0) {
            setSearchHomeList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        } else if (res.config.params.contentTypeId === 15) {
          if (res.data.length > 0) {
            setSearchPartyList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        }
      });
    } else {
      alert('검색어를 입력해주세요 😉');
    }
  };

  const onClickTotal = () => {
    setFindSearch(false);
    setNumber(0)
  };

  const onClickLocation = () => {
    setTitle('명소')
    setFindSearch(true);
    setNumber(12)
    // navigate(`/search/tour`, {
    //   state: {
    //     number: 12,
    //     searchItem: searchItem,
    //   },
    // });
  };

  const onClickFood = () => {
    setFindSearch(true);
    setNumber(39)
    setTitle('음식점')
    // navigate(`/search/tour`, {
    //   state: {
    //     number: 39,
    //     searchItem: searchItem,
    //   },
    // });
  };

  const onClickHome = () => {
    setFindSearch(true);
    setNumber(32)
    setTitle('숙박시설')
    // navigate(`/search/tour`, {
    //   state: {
    //     number: 32,
    //     searchItem: searchItem,
    //   },
    // });
  };

  const onClickParty = () => {
    setFindSearch(true);
    setNumber(15)
    setTitle('행사')
    // navigate(`/search/tour`, {
    //   state: {
    //     number: 15,
    //     searchItem: searchItem,
    //   },
    // });
  };
  

  return (
      <Container maxWidth="md">
          <div>
            <h2>여행지 검색하기</h2>
            <div class="search-box">
              <form>
                <input
                  class="input-search"
                  onChange={onSearchHandler}
                  placeholder="검색어를 입력해주세요."
                ></input>
                <button class="button-search" onClick={onSubmitHandler}>
                  검색
                </button>
              </form>
            </div>
          </div>
        {handsearch === false ? 
          <div></div>
         : (findSearch === true ? 
          <div>
            <div>
              <Button onClick={onClickTotal}>전체</Button>
              <Button onClick={onClickLocation}>명소</Button>
              <Button onClick={onClickFood}>음식점</Button>
              <Button onClick={onClickHome}>숙박시설</Button>
              <Button onClick={onClickParty}>행사</Button>
              <Button>여행 후기</Button>
              <Button>사용자</Button>
            </div>
            <h2 class="title">{title}</h2>
            <SearchDetail number={number} searchItem={searchItem}></SearchDetail> </div> : 
            <div>
          <div>
            <Button onClick={onClickTotal}>전체</Button>
            <Button onClick={onClickLocation}>명소</Button>
            <Button onClick={onClickFood}>음식점</Button>
            <Button onClick={onClickHome}>숙박시설</Button>
            <Button onClick={onClickParty}>행사</Button>
            <Button>여행 후기</Button>
            <Button>사용자</Button>
          </div>
         <SearchList
         class="card-list"
         searchLocationList={searchLocationList} 
         searchItem={searchItem} 
         noresult={noresult} 
         searchFoodList={searchFoodList} 
         searchHomeList={searchHomeList} 
         searchPartyList={searchPartyList}
         searchReivewList={searchReivewList}
         searchUserList={searchUserList}></SearchList>
        </div>
        )}
      </Container>
  );
}

export default Search;
