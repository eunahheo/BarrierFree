import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Search.css';
import SearchList from './SearchList';
import SearchDetail from './SearchDetail';
import SearchReviewDetail from './SearchReviewDetail';
import SearchUserDetail from './SearchUserDetail';
import SearchIcon from '@mui/icons-material/Search';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

function Search() {
  const myuser = useSelector((state) => state.user.userData);
  const [findSearch, setFindSearch] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [searchReivewList, setSearchReivewList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [searchCultureList, setSearchCultureList] = useState([]);
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
    setFindSearch(false);
    setSearchUserList([]);
    setSearchLocationList([]);
    setSearchFoodList([]);
    setSearchReivewList([]);
    setSearchHomeList([]);
    setSearchPartyList([]);
    setSearchCultureList([]);

    if (searchItem) {
      setHandsearch(true);
      axios({
        method: 'GET',
        url: '/search/post',
        params: {
          keyword: searchItem,
          page: 1,
          size: 5,
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
          page: 1,
          size: 5,
          userSeq: myuser.userSeq,
        },
      }).then((res) => {
        if (res.data.length > 0) {
          setSearchUserList(res.data);
        } else {
          setNoresult('?????? ????????? ???????????? ????');
        }
      });

      const impairmentNums = [12, 39, 14, 32, 15];

      for (var i = 0; i < impairmentNums.length; i++)
        axios({
          method: 'GET',
          url: '/search/tour',
          params: {
            contentTypeId: impairmentNums[i],
            keyword: searchItem,
            page: 1,
            size: 5,
            userSeq: myuser.userSeq,
          },
        }).then((res) => {
          if (res.config.params.contentTypeId === 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('?????? ????????? ???????????? ????');
            }
          } else if (res.config.params.contentTypeId === 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('?????? ????????? ???????????? ????');
            }
          } else if (res.config.params.contentTypeId === 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('?????? ????????? ???????????? ????');
            }
          } else if (res.config.params.contentTypeId === 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('?????? ????????? ???????????? ????');
            }
          } else if (res.config.params.contentTypeId === 14) {
            if (res.data.length > 0) {
              setSearchCultureList(res.data);
            } else {
              setNoresult('?????? ????????? ???????????? ????');
            }
          }
        });
    } else {
      alert('???????????? ?????????????????? ????');
    }
  };

  const onClickTotal = () => {
    setFindSearch(false);
    setNumber(0);
  };

  const onClickLocation = () => {
    setTitle('??????');
    setFindSearch(true);
    setNumber(12);
  };

  const onClickFood = () => {
    setFindSearch(true);
    setNumber(39);
    setTitle('?????????');
  };

  const onClickHome = () => {
    setFindSearch(true);
    setNumber(32);
    setTitle('????????????');
  };
  const onClickCulture = () => {
    setFindSearch(true);
    setNumber(14);
    setTitle('??????');
  };
  const onClickParty = () => {
    setFindSearch(true);
    setNumber(15);
    setTitle('??????');
  };
  const onClickReview = () => {
    setFindSearch(true);
    setTitle('?????? ??????');
  };
  const onClickUser = () => {
    setFindSearch(true);
    setTitle('?????????');
  };

  const changeFindSearch = () => {
    setFindSearch(true);
    setNumber(15);
    setTitle('??????');
  };

  return (
    <div data-aos="fade-up">
      <div>
        <div>
          <div class="search-box">
            {/* <h2 class="search-title">????????? ????????????</h2> */}
            <form>
              <input
                class="input-search"
                onChange={onSearchHandler}
                placeholder="???????????? ??????????????????."
              ></input>
              <SearchIcon
                style={{ color: 'white' }}
                onClick={onSubmitHandler}
              ></SearchIcon>
              <button class="mybutton" onClick={onSubmitHandler}>
                {/* ?????? */}
              </button>
            </form>
          </div>
        </div>
      </div>
      {handsearch === false ? (
        <div></div>
      ) : findSearch === true ? (
        <div>
          <div>
            {/* <Button onClick={onClickTotal}>??????</Button>
            <Button onClick={onClickLocation}>??????</Button>
            <Button onClick={onClickFood}>?????????</Button>
            <Button onClick={onClickHome}>????????????</Button>
            <Button onClick={onClickCulture}>??????</Button>
            <Button onClick={onClickParty}>??????</Button>
            <Button onClick={onClickReview}>?????? ??????</Button>
            <Button onClick={onClickUser}>?????????</Button> */}
            <table class="table-row">
              <th class="table-col-1" onClick={onClickTotal}>
                ??????
              </th>
              <th class="table-col-1" onClick={onClickLocation}>
                ??????
              </th>
              <th class="table-col-1" onClick={onClickFood}>
                ?????????
              </th>
              <th class="table-col-1" onClick={onClickHome}>
                ????????????
              </th>
              <th class="table-col-1" onClick={onClickCulture}>
                ??????
              </th>
              <th class="table-col-1" onClick={onClickParty}>
                ??????
              </th>
              <th class="table-col-1" onClick={onClickReview}>
                ?????? ??????
              </th>
              <th class="table-col-1" onClick={onClickUser}>
                ?????????
              </th>
            </table>
          </div>
          <h2 class="title">{title}</h2>
          {title === '?????? ??????' ? (
            <SearchReviewDetail searchItem={searchItem}></SearchReviewDetail>
          ) : title === '?????????' ? (
            <SearchUserDetail searchItem={searchItem}></SearchUserDetail>
          ) : (
            <SearchDetail
              number={number}
              searchItem={searchItem}
            ></SearchDetail>
          )}
        </div>
      ) : (
        <div>
          <div>
            <div>
              {/* <Button onClick={onClickTotal}>??????</Button>
              <Button onClick={onClickLocation}>??????</Button>
              <Button onClick={onClickFood}>?????????</Button>
              <Button onClick={onClickHome}>????????????</Button>
              <Button onClick={onClickCulture}>??????</Button>
              <Button onClick={onClickParty}>??????</Button>
              <Button onClick={onClickReview}>?????? ??????</Button>
              <Button onClick={onClickUser}>?????????</Button> */}
              <table class="table-row">
                <th class="table-col-1" onClick={onClickTotal}>
                  ??????
                </th>
                <th class="table-col-1" onClick={onClickLocation}>
                  ??????
                </th>
                <th class="table-col-1" onClick={onClickFood}>
                  ?????????
                </th>
                <th class="table-col-1" onClick={onClickHome}>
                  ????????????
                </th>
                <th class="table-col-1" onClick={onClickCulture}>
                  ??????
                </th>
                <th class="table-col-1" onClick={onClickParty}>
                  ??????
                </th>
                <th class="table-col-1" onClick={onClickReview}>
                  ?????? ??????
                </th>
                <th class="table-col-1" onClick={onClickUser}>
                  ?????????
                </th>
              </table>
            </div>
            <SearchList
              class="card-list"
              searchLocationList={searchLocationList}
              searchItem={searchItem}
              noresult={noresult}
              searchFoodList={searchFoodList}
              searchHomeList={searchHomeList}
              searchCultureList={searchCultureList}
              searchPartyList={searchPartyList}
              searchReivewList={searchReivewList}
              searchUserList={searchUserList}
              changeFindSearch={changeFindSearch}
              setNumber={setNumber}
              setTitle={setTitle}
            ></SearchList>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
