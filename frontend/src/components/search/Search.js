import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import SearchCardList from './SearchCardList.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Search.css';
import { useNavigate } from '../../../node_modules/react-router/index.js';

function Search() {
  const myuser = useSelector((state) => state.user.userData);
  const [itemList, setItemList] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [searchReivewList, setSearchReivewList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [searchPartyList, setSearchPartyList] = useState([]);
  const [noresult, setNoresult] = useState('');
  const [handsearch, setHandsearch] = useState(false);
  const navigate = useNavigate();

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
      axios({
        method: 'GET',
        url: '/search/tour',
        params: {
          contentTypeId: 12,
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        // console.log(res.data)
        if (res.data.length > 0) {
          setSearchLocationList(res.data);
        } else {
          setNoresult('검색 내용이 없습니다 😥');
        }
      });

      axios({
        method: 'GET',
        url: '/search/tour',
        params: {
          contentTypeId: 39,
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        setSearchFoodList(res.data);
      });

      axios({
        method: 'GET',
        url: '/search/tour',
        params: {
          contentTypeId: 32,
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        setSearchHomeList(res.data);
      });

      axios({
        method: 'GET',
        url: '/search/tour',
        params: {
          contentTypeId: 15,
          keyword: searchItem,
          page: 0,
          size: 4,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        setSearchPartyList(res.data);
      });
    } else {
      alert('검색어를 입력해주세요 😉');
    }
  };

  const onClickLocation = () => {
    navigate(`/search/tour`, {
      state: {
        number: 12,
        searchItem: searchItem,
      },
    });
  };

  const onClickFood = () => {
    navigate(`/search/tour`, {
      state: {
        number: 39,
        searchItem: searchItem,
      },
    });
  };

  const onClickHome = () => {
    navigate(`/search/tour`, {
      state: {
        number: 32,
        searchItem: searchItem,
      },
    });
  };

  const onClickParty = () => {
    navigate(`/search/tour`, {
      state: {
        number: 15,
        searchItem: searchItem,
      },
    });
  };

  const onClickToSearch = () => {
    setHandsearch(false);
  };

  return (
    <div>
      <Container maxWidth="md">
        {handsearch == true ? (
          <div>
            <div>
              <p onClick={onClickToSearch}>검색창으로 돌아가기</p>
              {searchLocationList.length >= 1 ? (
                <div>
                  <h2>명소</h2>
                  <p onClick={onClickLocation}>더보기</p>
                  <SearchCardList
                    itemList={searchLocationList}
                  ></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2>명소</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchFoodList.length >= 1 ? (
                <div>
                  <h2>음식점</h2>
                  <p onClick={onClickFood}>더보기</p>
                  <SearchCardList itemList={searchFoodList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2>음식점</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchHomeList.length >= 1 ? (
                <div>
                  <h2>숙박시설</h2>
                  <p onClick={onClickHome}>더보기</p>
                  <SearchCardList itemList={searchHomeList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2>숙박시설</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchPartyList.length >= 1 ? (
                <div>
                  <h2>행사</h2>
                  <p onClick={onClickParty}>더보기</p>
                  <SearchCardList itemList={searchPartyList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2>행사</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchReivewList.length >= 2 ? (
                <div>
                  <h2>여행 후기</h2>
                  {searchReivewList.map((review) => (
                    <p key={review.post_seq}>{review.post_title}</p>
                  ))}
                </div>
              ) : (
                <div>
                  <h2>여행 후기</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchUserList.length >= 1 ? (
                <div>
                  <h2>사용자</h2>
                  {searchUserList.map((result) => (
                    <p key={result.userSeq}>{result.userNickname}</p>
                  ))}
                </div>
              ) : (
                <div>
                  <h2>사용자</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2>여행지 검색하기</h2>

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
        )}
      </Container>
    </div>
  );
}

export default Search;
