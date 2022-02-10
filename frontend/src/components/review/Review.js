import React, { useEffect, useState, useCallback } from 'react';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useParams } from 'react-router';
import CommentItem from './CommentItem.js';
import './ReviewTest.css';
import { useDispatch, useSelector } from 'react-redux';
import { commentSave } from '../../_actions/comment_actions';
import styled from 'styled-components';
import palette from '../../lib/styles/palette.js';
import { useNavigate } from '../../../node_modules/react-router/index.js';
import { getCurrentParams } from '../../_actions/current_actions.js';

const ReviewBox = styled.div`
  display: flex;
  flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;

  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};
    text-align: center;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      background: ${palette.pink[0]};
      color: white;
      cursor: pointer;
    }
  }
  .smc {
    width: 150px;
    height: 150px;
  }
  .span {
    display: flex;
    // flex-dirextion: row;
    display: table-cell;
    vertical-align: middle;
  }
`;
const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNum = useParams();
  const params = useParams();
  const reviewNum = Number(pageNum.reviewCard);
  const myuser = useSelector((state) => state.user.userData);

  // review 내용 불러오기 위한 const

  const [reviewDetail, setReviewDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const commentCnt = comments.length;

  // 댓글 작성을 위한 const

  const [newComment, setNewComment] = useState('');
  const onCommentHandler = (event) => {
    setNewComment(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    async function getDeatilFn() {
      setLoading(true);
      try {
        const res = await axios({
          method: 'GET',
          url: '/post/detail',
          params: { postSeq: reviewNum },
        });
        setReviewDetail(res.data[0].post);
        setBarriers(res.data[0].impairment);
        setReviewPoint(res.data[0].post.postPoint);
        setReviewTime(res.data[0].post.regDt.substring(0, 10));
        setReviewImage(res.data[0].post.postPhoto);

        console.log('reviewdetail', reviewDetail);

        const response = await axios({
          method: 'get',
          url: '/othersFeed/main',
          params: {
            otherUserSeq: res.data[0].post.userSeq,
            userSeq: myuser.userSeq,
          },
        });
        console.log(response);
        setOtherUser(response.data);
      } catch (e) {
        console.log(e);
        console.log('ERROR');
      } finally {
        setLoading(false);
      }
    }
    getDeatilFn();
  }, []);

  useEffect(() => {
    getCommentList();
  }, []);

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

  return (
    <div>
      <ReviewBox>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
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
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/user/${reviewDetail.userSeq}`);
                      dispatch(getCurrentParams(reviewDetail.userSeq));
                    }}
                  >
                    <img className="toggle" src={otherUser.userPhoto}></img>
                    <span>작성자 : {otherUser.userNickname}</span>
                  </div>
                  <p id="time">{reviewTime}</p>
                  <Rating
                    name="read-only"
                    value={reviewPoint}
                    readOnly
                  ></Rating>
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
                        type="submit"
                      >
                        작성
                      </button>
                    </form>
                    <p class="comment">댓글보기({commentCnt})</p>
                    <hr class="hr-comment"></hr>
                    {commentCnt >= 1 ? (
                      <div class="comment-list">
                        {comments.map((comment) => (
                          <CommentItem comment={comment} key={comment.cmtSeq} />
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
        )}
      </ReviewBox>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;
