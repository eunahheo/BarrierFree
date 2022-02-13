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
      <h2 class="title">명소<p class="more" onClick={onClickLocation}>+더보기</p></h2>
      {searchLocationList.length > 0 ? (
        <div>
          <RecommendCardList
            itemList={searchLocationList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>{noresult}</div>
      )}
      <h2 class="title">음식점<p class="more" onClick={onClickFood}>+더보기</p></h2>
      {searchFoodList.length > 0 ? (
        <div>
          <RecommendCardList
            itemList={searchFoodList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>{noresult}</div>
      )}
      <h2 class="title">숙박시설<p class="more" onClick={onClickHome}>+더보기</p></h2>
      {searchHomeList.length > 0 ? (
        <div>
          <RecommendCardList
            itemList={searchHomeList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>{noresult}</div>
      )}
      <h2 class="title">행사<p class="more" onClick={onClickParty}>+더보기</p></h2>
      {searchPartyList.length > 0 ? (
        <div>
          <RecommendCardList
            itemList={searchPartyList}
            // category={category}
          ></RecommendCardList>
        </div>
      ) : (
        <div>{noresult}</div>
      )}
    </div>
  )
}

export default RecommendList;