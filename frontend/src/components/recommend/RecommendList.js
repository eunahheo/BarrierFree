import RecommendCardList from "./RecommendCardList";

const RecommendList = ( {searchLocationList, searchFoodList, searchHomeList, searchPartyList, noresult, changeFindSearch, setNumber, setTitle} ) => {
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
      {searchLocationList.length > 0 ? (
        <div>
          <h2 class="title">명소<p class="more" onClick={onClickLocation}>+더보기</p></h2>
          <RecommendCardList
            itemList={searchLocationList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>
          <h2 class="title">명소</h2>
          {noresult}
        </div>
      )}
      {searchFoodList.length > 0 ? (
        <div>
          <h2 class="title">음식점<p class="more" onClick={onClickFood}>+더보기</p></h2>
          <RecommendCardList
            itemList={searchFoodList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>
          <h2 class="title">음식점</h2>
          {noresult}
          </div>
      )}
      {searchHomeList.length > 0 ? (
        <div>
          <h2 class="title">숙박시설<p class="more" onClick={onClickHome}>+더보기</p></h2>
          <RecommendCardList
            itemList={searchHomeList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>
          <h2 class="title">숙박시설</h2>
        {noresult}
        </div>
      )}
      {searchPartyList.length > 0 ? (
        <div>
          <h2 class="title">행사<p class="more" onClick={onClickParty}>+더보기</p></h2>
          <RecommendCardList
            itemList={searchPartyList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>
          <h2 class="title">행사</h2>
        {noresult}
        </div>
      )}
    </div>
  )
}

export default RecommendList;