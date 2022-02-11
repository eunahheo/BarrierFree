import React, { useEffect, useState, useCallback } from 'react';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useParams } from 'react-router';
import CommentItem from './CommentItem.js';
import './ReviewTest.css';
import { useDispatch, useSelector } from 'react-redux';
import { commentSave } from '../../_actions/comment_actions';

const Review = () => {
  const dispatch = useDispatch();

  const pageNum = useParams();
  const reviewNum = Number(pageNum.reviewCard);
  const myuser = useSelector((state) => state.user.userData);

  // review 내용 불러오기 위한 const

  const [reviewDetail, setReviewDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const commentCnt = comments.length;

  // 댓글 작성을 위한 const

  const [newComment, setNewComment] = useState('');
  const onCommentHandler = (event) => {
    setNewComment(event.target.value);
  };

  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    getPostDetail();
    getCommentList();
  }, []);

  const getPostDetail = () => {
    axios({
      method: 'GET',
      url: '/post/detail',
      params: { postSeq: reviewNum },
    })
      .then((res) => {
        console.log(res);
        setReviewDetail(res.data[0].post);
        setBarriers(res.data[0].impairment);
        setReviewPoint(res.data[0].post.postPoint);
        setReviewTime(res.data[0].post.regDt.substring(0, 10));
        setReviewImage(res.data[0].post.postPhoto);
        console.log(res.data[0].impairment[0]);
      })
      .catch('yes');
  };

  const getCommentList = () => {
    axios({
      method: 'GET',
      url: '/post/comment/detail',
      params: { postSeq: reviewNum },
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch('yes');
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (newComment) {
      let body = {
        cmtContent: newComment,
        postSeq: reviewNum,
        userSeq: myuser.userSeq,
      };
      dispatch(commentSave(body));
    } else {
      alert('댓글을 입력해주세요 😉');
    }
    getCommentList();
  };

  const onRemove = (id) => {
    setComments(comments.filter(comment => comment.cmtSeq !== id))
  }
  return (
    <div>
      {/* <Header/> */}
      <div class="review-box">
        <div>
          <div class="review">
            <div class="review-img">
              <img src={reviewImage} class="review-img-size" />
            </div>
            <div class="review-content">
              <div class="button-top">
                <button variant="contained" id="update">
                  수정
                </button>
                <button variant="contained" id="delete">
                  삭제
                </button>
              </div>
              <h1>{reviewDetail.postTitle}</h1>
              <p id="time">{reviewTime}</p>
              <Rating name="read-only" value={reviewPoint} readOnly></Rating>
              <p>{barriers}</p>
              <p class="text-content">{reviewDetail.postContent}</p>
              <InfoIcon></InfoIcon>
              <span class="location-name">{reviewDetail.postLocation}</span>
              <div class="comment-box">
                <form onSubmit={onSubmitHandler}>
                  <input
                    class="comment-input"
                    placeholder="댓글을 입력하세요"
                    onChange={onCommentHandler}
                  ></input>
                  <button
                    class="button"
                    onClick={onSubmitHandler}
                    variant="contained"
                  >
                    작성
                  </button>
                </form>
                <p class="comment">댓글보기({commentCnt})</p>
                <hr class="hr-comment"></hr>
                {commentCnt >= 1 ? (
                  <div class="comment-list">
                    {comments.map((comment) => (
                      <CommentItem comment={comment} key={comment.cmtSeq} onRemove={onRemove} />
                    ))}
                  </div>
                ) : (
                  <p class="no-comment">아직 댓글이 없어요 😉</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;
