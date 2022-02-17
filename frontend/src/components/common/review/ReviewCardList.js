import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ImageList } from '@mui/material';
import ReviewCard from './ReviewCard';
import '../../search/SearchCardList.css';
import './ReviewListScroll.css';

const ReviewCardList = ({ reviewtype }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const myuser = useSelector((state) => state.user.userData);
  const [ref, inView] = useInView();
  const [currentType, setCurrentType] = useState(reviewtype);

  useEffect(() => {
    setCurrentType(reviewtype);
    setItems([]);
    setPage(1);
    getItems();
  }, [reviewtype]);

  const getItems = useCallback(async () => {
    setLoading(true);
    if (myuser) {
      await axios({
        method: 'get',
        url: `/main/${reviewtype}`,
        params: {
          userSeq: myuser.userSeq,
          page: page,
          size: 10,
        },
      }).then((res) => {
        setItems((itemLists) => itemLists.concat(res.data));
      });
    } else {
      await axios({
        method: 'get',
        url: `/main/${reviewtype}`,
        params: {
          userSeq: 0,
          page: page,
          size: 10,
        },
      }).then((res) => {
        setItems((itemLists) => itemLists.concat(res.data));
      });
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      {items.length === 0 ? (
        <div>
          <h1>로딩중</h1>
        </div>
      ) : (
        <div>
          <ImageList cols={5}>
            {items.map((item, index) => {
              return (
                <div ref={ref}>
                  <ReviewCard item={item} key={index} />
                </div>
              );
            })}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default ReviewCardList;
