import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from 'react-redux';
import RecommendCardList from './RecommendCardList.js';
import { Container } from '@material-ui/core';
import qs from 'qs';

const RecommendDetail = ( {number, city, town, barrier, noresult} ) => {
  const [searchList, setSearchList] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  // console.log(location);
  // const number = location.state.number;
  // const searchItem = location.state.searchItem;
  
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
        page: 0,
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
      }); 
    } else if (barrier) {
      let data = {
        userSeq: myuser.userSeq,
        contentTypeId: number,
        impairments: barrier,
        page: 0,
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
      }); 
    } else if (city, town) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: number,
        page: 0,
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
      }); 
    }
  };

  useEffect(() => {
    getSearchDetail();
  }, [number]);

  // const onClickToSearch = () => {
  //   navigate('/search');
  // };

  return (
    <Container maxWidth="md">
    <div>
      {/* <p onClick={onClickToSearch}>검색창으로 돌아가기</p> */}
      {searchList.length > 0? 
      <RecommendCardList itemList={searchList}></RecommendCardList> :
      <div>
        <p>{noresult}</p>
      </div>
    }
    </div>
    </Container>
  );
};

export default RecommendDetail;
