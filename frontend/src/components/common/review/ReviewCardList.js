// import { ImageList } from '@mui/material';
// import ReviewCard from './ReviewCard';
// import React, { memo, useCallback, useEffect, useState } from 'react';
// import styled, { createGlobalStyle } from 'styled-components';
// import Loader from '../Loader';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const ReviewCardList = ({ itemList }) => {
//   const myuser = useSelector((state) => state.user.userData);
//   const [target, setTarget] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [itemLists, setItemLists] = useState([]);
//   const [temp, setTemp] = useState(null);
//   const [numb, setNumb] = useState(1);

//   const [page, setPage] = useState(1);
//   useEffect(() => {
//     setPage((prevState) => prevState + 1);
//     console.log(itemLists);
//   }, [itemLists]);

//   const getMoreItem = async () => {
//     setPage((prevState) => prevState + 1);
//     setIsLoaded(true);
//     await axios({
//       method: 'get',
//       url: '/main/recently',
//       params: {
//         userSeq: myuser.userSeq,
//         page: page,
//         size: 10,
//       },
//     }).then((res) => {
//       setItemLists((itemLists) => itemLists.concat(res.data));
//       setPage((prevState) => prevState + 1);
//     });
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setIsLoaded(false);
//   };

//   const onIntersect = async ([entry], observer) => {
//     if (entry.isIntersecting && !isLoaded) {
//       observer.unobserve(entry.target);
//       setNumb(numb + 1);
//       console.log(numb);
//       await getMoreItem();
//       observer.observe(entry.target);
//       setPage((prevState) => prevState + 1);
//     }
//   };

//   useEffect(() => {
//     let observer;
//     setPage((prevState) => prevState + 1);
//     if (target) {
//       observer = new IntersectionObserver(onIntersect, {
//         threshold: 1,
//       });
//       observer.observe(target);
//     }
//     return () => observer && observer.disconnect();
//   }, [target]);

//   return (
//     <div className="ReviewCardList">
//       <div>
//         {itemList.length === 0 ? (
//           <div>
//             <h1>로딩 중...</h1>
//           </div>
//         ) : (
//           <div>
//             <ImageList cols={5}>
//               {itemLists.map((item, index) => {
//                 return <ReviewCard item={item} key={index} />;
//               })}
//             </ImageList>
//           </div>
//         )}
//       </div>
//       <div ref={setTarget}>{isLoaded && <Loader />}</div>
//     </div>
//   );
// };
// export default memo(ReviewCardList);

import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ImageList } from '@mui/material';
import ReviewCard from './ReviewCard';
import '../../search/SearchCardList.css';

const ReviewCardList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const myuser = useSelector((state) => state.user.userData);
  const [ref, inView] = useInView();

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: '/main/recently',
      params: {
        userSeq: myuser.userSeq,
        page: page,
        size: 10,
      },
    }).then((res) => {
      // setItems((prevState) => [...prevState, res.data]);
      setItems((itemLists) => itemLists.concat(res.data));
    });
    setLoading(false);
  }, [page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <div class="list">
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
              // });
            })}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default ReviewCardList;
