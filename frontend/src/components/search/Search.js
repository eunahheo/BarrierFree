import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import SearchCardList from "./SearchCardList.js";
import axios from "axios";

function Search() {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    axios({
      url: "post/all?userSeq=1",
    }).then(function (res) {
      setItemList(res.data);
    });
  }, []);

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
