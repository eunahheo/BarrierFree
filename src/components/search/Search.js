import React from "react";
import MainCard from "../common/MainCard.js"
import { Container } from "@material-ui/core";

function Search() {
  return (
    <div>
      <Container maxWidth="md">
        <h2>검색하기</h2>
        <hr></hr>
        {/* <MainCard></MainCard> */}
      </Container>
    </div>
  )
}

export default Search;