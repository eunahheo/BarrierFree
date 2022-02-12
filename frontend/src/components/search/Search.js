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
  const [number, setNumber] = useState(0);
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


  return (
    
      <Container maxWidth="md">
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
        {handsearch === true ? (
          <div>
            <div>
              {searchLocationList.length >= 1 ? (
                <div>
                  <h2 class="title">명소</h2>
                  <p class="more" id={12} onClick={(e) => {
                    setNumber(e.target.id)
                  },
                  onClickLocation
                  }>+더보기</p>
                  <SearchCardList
                    itemList={searchLocationList}
                  ></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2 class="title">명소</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchFoodList.length >= 1 ? (
                <div>
                  <h2 class="title">음식점</h2>
                  <p class="more" onClick={onClickFood}>+더보기</p>
                  <SearchCardList itemList={searchFoodList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2 class="title">음식점</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchHomeList.length >= 1 ? (
                <div>
                  <h2 class="title">숙박시설</h2>
                  <p class="more" onClick={onClickHome}>+더보기</p>
                  <SearchCardList itemList={searchHomeList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2 class="title">숙박시설</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchPartyList.length >= 1 ? (
                <div>
                  <h2 class="title">행사</h2>
                  <p class="more" onClick={onClickParty}>+더보기</p>
                  <SearchCardList itemList={searchPartyList}></SearchCardList>
                </div>
              ) : (
                <div>
                  <h2 class="title">행사</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchReivewList.length >= 2 ? (
                <div>
                  <h2 class="title">여행 후기</h2>
                  {searchReivewList.map((review) => (
                    <p key={review.post_seq}>{review.post_title}</p>
                  ))}
                </div>
              ) : (
                <div>
                  <h2 class="title">여행 후기</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
            <div>
              {searchUserList.length >= 1 ? (
                <div>
                  <h2 class="title">사용자</h2>
                  {searchUserList.map((result) => (
                    <p key={result.userSeq}>{result.userNickname}</p>
                  ))}
                </div>
              ) : (
                <div>
                  <h2 class="title">사용자</h2>
                  <p>{noresult}</p>
                </div>
              )}
            </div>
          </div>
        ) : <div></div>}
      </Container>
  );
}

export default Search;
