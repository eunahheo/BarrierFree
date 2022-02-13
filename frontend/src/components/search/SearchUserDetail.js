import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from 'react-redux';
import SearchUserCardList from './SearchUserCardList.js';
import Pagination from 'react-js-pagination';
import './SearchDetail.css';

const SearchDetail = ({ searchItem, noresult }) => {
  const [searchList, setSearchList] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1);
  const [lastpage, setLastpage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  const getSearchDetail = () => {
    axios({
      methods: 'GET',
      url: '/search/user',
      params: {
        keyword: searchItem,
        page: page,
        size: 12,
        userSeq: myuser.userSeq,
      },
    }).then((res) => {
      setSearchList(res.data);
      setLastpage(res.data[0].totalPages);
      setTotalItem(res.data[0].totalElements);
    });
  };

  useEffect(() => {
    getSearchDetail();
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <div>
      {searchList.length > 0 ? (
        <div>
          <SearchUserCardList itemList={searchList}></SearchUserCardList>
          <Pagination
            activePage={page}
            itemsCountPerPage={12}
            totalItemsCount={totalItem}
            pageRangeDisplayed={5}
            prevPageText={'<'}
            nextPageText={'>'}
            onChange={handlePageChange}
          ></Pagination>
        </div>
      ) : (
        <div>
          <p>{noresult}</p>
        </div>
      )}
    </div>
  );
};

export default SearchDetail;
