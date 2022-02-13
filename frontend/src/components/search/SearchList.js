import SearchCardList from './SearchCardList.js';
import { useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router/index.js';
const SearchList = ({searchLocationList, searchItem, noresult, searchFoodList, searchHomeList, searchPartyList, searchReivewList, searchUserList, changeFindSearch, setNumber, setTitle}) => {

  const onClickLocation = () => {
    changeFindSearch()
    setTitle('명소')
    setNumber(12)
  };

  const onClickFood = () => {
    changeFindSearch()
    setNumber(39)
    setTitle('음식점')
  };

  const onClickHome = () => {
    changeFindSearch()
    setNumber(32)
    setTitle('숙박시설')
  };

  const onClickParty = () => {
    changeFindSearch()
    setNumber(15)
    setTitle('행사')
  };
  

  return (
    <div>
    <div>
      {searchLocationList.length >= 1 ? (
        <div>
          <h2 class="title">명소<p class="more" onClick={onClickLocation}>+더보기</p></h2>
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
          <h2 class="title">음식점 <p class="more" onClick={onClickFood}>+더보기</p></h2>
          
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
          <h2 class="title">숙박시설 <p class="more" onClick={onClickHome}>+더보기</p></h2>
          
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
          <h2 class="title">행사 <p class="more" onClick={onClickParty}>+더보기</p></h2>
          
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
  )
}

export default SearchList;