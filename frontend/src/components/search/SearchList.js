import SearchCardList from './SearchCardList.js';
import SearchUserCardList from './SearchUserCardList.js';
import SearchReviewCardList from './SearchReviewCardList.js';
const SearchList = ({
  searchLocationList,
  noresult,
  searchFoodList,
  searchHomeList,
  searchPartyList,
  searchReivewList,
  searchUserList,
  searchCultureList,
  changeFindSearch,
  setNumber,
  setTitle,
}) => {
  const onClickLocation = () => {
    changeFindSearch();
    setTitle('명소');
    setNumber(12);
  };

  const onClickFood = () => {
    changeFindSearch();
    setNumber(39);
    setTitle('음식점');
  };

  const onClickHome = () => {
    changeFindSearch();
    setNumber(32);
    setTitle('숙박시설');
  };

  const onClickCulture = () => {
    changeFindSearch();
    setNumber(14);
    setTitle('문화');
  };

  const onClickParty = () => {
    changeFindSearch();
    setNumber(15);
    setTitle('행사');
  };

  const onClickReview = () => {
    changeFindSearch();
    setTitle('여행 후기');
  };

  const onClickUser = () => {
    changeFindSearch();
    setTitle('사용자');
  };

  return (
    <div>
      <div>
        {searchLocationList.length >= 1 ? (
          <div>
            <h2 class="title">
              명소
              <p class="more" onClick={onClickLocation}>
                +더보기
              </p>
            </h2>
            <SearchCardList itemList={searchLocationList}></SearchCardList>
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
            <h2 class="title">
              음식점{' '}
              <p class="more" onClick={onClickFood}>
                +더보기
              </p>
            </h2>

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
            <h2 class="title">
              숙박시설{' '}
              <p class="more" onClick={onClickHome}>
                +더보기
              </p>
            </h2>

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
        {searchCultureList.length >= 1 ? (
          <div>
            <h2 class="title">
              문화
              <p class="more" onClick={onClickCulture}>
                +더보기
              </p>
            </h2>

            <SearchCardList itemList={searchCultureList}></SearchCardList>
          </div>
        ) : (
          <div>
            <h2 class="title">문화</h2>
            <p>{noresult}</p>
          </div>
        )}
      </div>
      <div>
        {searchPartyList.length >= 1 ? (
          <div>
            <h2 class="title">
              행사
              <p class="more" onClick={onClickParty}>
                +더보기
              </p>
            </h2>

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
        {searchReivewList.length >= 1 ? (
          <div>
            <h2 class="title">
              여행 후기
              <p class="more" onClick={onClickReview}>
                +더보기
              </p>
            </h2>
            <SearchReviewCardList
              itemList={searchReivewList}
            ></SearchReviewCardList>
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
            <h2 class="title">
              사용자
              <p class="more" onClick={onClickUser}>
                +더보기
              </p>
            </h2>
            <SearchUserCardList itemList={searchUserList}></SearchUserCardList>
          </div>
        ) : (
          <div>
            <h2 class="title">사용자</h2>
            <p>{noresult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
