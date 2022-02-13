import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from 'react-redux';
import RecommendCardList from './RecommendCardList.js';
import { Container } from '@material-ui/core';
import qs from 'qs';
import Pagination from "react-js-pagination";
import "./RecommendDetail.css"

const RecommendDetail = ( {number, city, town, barrier, noresult} ) => {
  const [searchList, setSearchList] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1);
  const [lastpage, setLastpage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  
  const getSearchDetail = () => {
    const cityNum = Number(city);
    const townNum = Number(town);
    if (city && town && barrier) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: number,
        impairments: barrier,
        page: page,
        size: 12,
      };
      axios({
        methods: 'GET',
        url: '/recommend/search',
        params: data,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }).then((res) => {
        setSearchList(res.data);
        setLastpage(res.data[0].totalPages)
        setTotalItem(res.data[0].totalElements)
      }); 
    } else if (barrier) {
      let data = {
        userSeq: myuser.userSeq,
        contentTypeId: number,
        impairments: barrier,
        page: page,
        size: 12,
      };
      axios({
        methods: 'GET',
        url: '/recommend/search',
        params: data,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }).then((res) => {
        setSearchList(res.data);
        setLastpage(res.data[0].totalPages)
        setTotalItem(res.data[0].totalElements)
      }); 
    } else if (city, town) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: number,
        page: page,
        size: 12,
      };
      axios({
        methods: 'GET',
        url: '/recommend/search',
        params: data,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }).then((res) => {
        setSearchList(res.data);
        setLastpage(res.data[0].totalPages)
        setTotalItem(res.data[0].totalElements)
      }); 
    }
  };

  useEffect(() => {
    getSearchDetail();
  }, [number, page]);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  // const onClickToSearch = () => {
  //   navigate('/search');
  // };

  return (
    <Container maxWidth="md">
    <div>
      {/* <p onClick={onClickToSearch}>검색창으로 돌아가기</p> */}
      {searchList.length > 0? 
      <div>
        <RecommendCardList itemList={searchList}></RecommendCardList>
        <Pagination
          activePage={page}
          itemsCountPerPage={12}
          totalItemsCount={totalItem}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePageChange}
        ></Pagination>
      </div> :
      <div>
        <p>{noresult}</p>
      </div>
    }
    </div>
    </Container>
  );
};

export default RecommendDetail;
