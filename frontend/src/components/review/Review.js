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
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button.js';
import {
  follow,
  resetRelationship,
  unfollow,
} from '../../_actions/relationship_actions.js';
import ReviewBarrierIcon from '../common/review/ReviewBarrierIcon.js';
import { setPostContent } from '../../_actions/write_actions.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

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
  const reviewNum = Number(pageNum.reviewCard);
  const myuser = useSelector((state) => state.user.userData);
  const [postInfo, setPostInfo] = useState(null);
  // review 내용 불러오기 위한 const
  // debugger;
  const [reviewDetail, setReviewDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const commentCnt = comments.length;
  // 댓글 작성을 위한 const
  const [heart, setHeart] = useState(false);
  const [scraptimes, setScraptimes] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { kakao } = window;
  const onCommentHandler = (event) => {
    setNewComment(event.target.value);
  };
  const onCommentReset = () => {
    setNewComment('');
  };

  const [loading, setLoading] = useState(false);
  const [checkFw, setCheckFw] = useState(false);
  // const postScrap = reviewDetail.postScrap
  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    axios({
      method: 'get',
      url: '/scrap/check',
      params: {
        scrap_data: reviewNum,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    }).then(function (res) {
      if (res.data.scrap_yn == 'y') {
        setHeart(true);
      }
    });
    getDetailFn();
    getCommentList();
  }, []);

  async function getDetailFn() {
    setLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: '/post/detail',
        params: { postSeq: reviewNum },
      });
      setPostInfo(res.data[0]);
      setReviewDetail(res.data[0].post);
      setBarriers(res.data[0].impairment);
      setReviewPoint(res.data[0].post.postPoint);
      setReviewTime(res.data[0].post.regDt.substring(0, 10));
      setReviewImage(res.data[0].post.postPhoto);
      setImgAlt(res.data[0].post.postAlt);
      setScraptimes(res.data[0].post.postScrap);
      kakaomap_rendering(res.data[0].post);
      const response = await axios({
        method: 'get',
        url: '/othersFeed/main',
        params: {
          otherUserSeq: res.data[0].post.userSeq,
          userSeq: myuser.userSeq,
        },
      });
      setOtherUser(response.data);
      // console.log('otheruser', otherUser);
      const response2 = await axios({
        method: 'get',
        url: '/sns/isfollow',
        params: {
          otherUserSeq: res.data[0].post.userSeq,
          userSeq: myuser.userSeq,
        },
      });
      if (response2.data.isfollow === 'y') {
        setCheckFw(true);
      }
    } catch (e) {
      // console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const getCommentList = () => {
    axios({
      method: 'GET',
      url: '/post/comment/detail',
      params: { postSeq: reviewNum },
    })
      .then((res) => {
        setComments(res.data);
        setNewComment('');
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

      alert('댓글 작성이 완료되었습니다. 😉');
    } else {
      alert('댓글을 입력해주세요 😉');
    }
    setNewComment('');
    getCommentList();
  };

  const onRemove = (id) => {
    setComments(comments.filter((comment) => comment.cmtSeq !== id));
  };

  // 팔로우, 팔로잉

  const onUnfollow = () => {
    dispatch(unfollow(myuser.userSeq, reviewDetail.userSeq));
    setCheckFw(false);
    dispatch(resetRelationship());
  };

  const onFollow = () => {
    dispatch(follow(myuser.userSeq, reviewDetail.userSeq));
    setCheckFw(true);
    dispatch(resetRelationship());
  };
  const plusScrap = reviewDetail.postScrap + 1;

  const onClickHeart = () => {
    setHeart(true);
    setScraptimes(scraptimes + 1);
    axios({
      method: 'get',
      url: '/scrap/insert',
      params: {
        scrap_data: reviewNum,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    });
    const plusPostScrap = reviewDetail.userSeq + 1;
  };

  const onRemoveHeart = () => {
    setHeart(false);
    setScraptimes(scraptimes - 1);
    axios({
      method: 'put',
      url: '/scrap/delete',
      params: {
        scrap_data: reviewNum,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    });
  };
  const TTS = () => {
    const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const xmlData = '<speak>' + imgAlt + '</speak>';
    try {
      const { data } = axios
        .post(
          'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize',
          xmlData,
          {
            headers: {
              'Content-Type': 'application/xml',
              Authorization: `KakaoAK ${API_KEY}`,
            },
            responseType: 'arraybuffer',
          },
        )
        .then(function (res) {
          // console.log(res);
          const context = new AudioContext();
          context.decodeAudioData(res.data, (buffer) => {
            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start(0);
          });
        });
    } catch (e) {
      console.error(e.message);
    }
  };
  // 게시글 수정
  // console.log('reviewDeatil', reviewDetail);
  const onEdit = () => {
    dispatch(setPostContent(postInfo));
    navigate('/write');
  };

  // 게시글 삭제
  const [open, setOpen] = React.useState(false);
  const [passOpen, setPassOpen] = React.useState(false);

  const onDelete = () => {
    axios({
      method: 'put',
      url: '/post/delete',
      params: {
        postSeq: reviewNum,
        userSeq: myuser.userSeq,
      },
    }).then(alert('삭제가 완료되었습니다!'), navigate(-1));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePassOpen = () => {
    setPassOpen(true);
  };
  const updatePass = () => {
    const token = localStorage.getItem('accessToken');
    setPassOpen(true);
    axios({});
    handlePassClose();
  };

  const handlePassClose = () => {
    // setUserPwd('');
    // setUserConfirmPwd('');
    // setErrorMessage({
    //   ...errorMessage,
    //   confirmPwdError: '',
    //   pwdError: '',
    // });
    setPassOpen(false);
  };

  const kakaomap_rendering = (data) => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(data.postLat, data.postLng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(data.postLat, data.postLng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    var mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  };

  return (
    <div>
      <ReviewBox>
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : ( */}
        <div class="review-box">
          <div>
            <div class="review">
              <div class="review-img" onClick={TTS}>
                <img src={reviewImage} class="review-img-size" />
                <p>사진을 누르시면 사진 설명을 들으실 수 있어요 🎧</p>
              </div>
              <div class="review-content">
                {reviewDetail.userSeq == myuser.userSeq ? (
                  <div class="button-top">
                    <button
                      variant="contained"
                      id="update"
                      onClick={onEdit}
                      style={{ cursor: 'pointer' }}
                    >
                      수정
                    </button>
                    <button
                      variant="contained"
                      id="delete"
                      impact
                      onClick={handleClickOpen}
                      style={{ cursor: 'pointer' }}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <span></span>
                )}
                <h2>
                  {heart ? (
                    <span
                      style={{
                        color: `${palette.pink[0]}`,
                        cursor: 'pointer',
                      }}
                      onClick={onRemoveHeart}
                    >
                      ❤
                    </span>
                  ) : (
                    <span
                      style={{
                        color: `${palette.pink[0]}`,
                        cursor: 'pointer',
                      }}
                      onClick={onClickHeart}
                    >
                      ♡
                    </span>
                  )}
                  <span> {scraptimes}</span>
                  {/* {review} */}
                </h2>
                <h1>{reviewDetail.postTitle}</h1>
                <div>
                  <div style={{ cursor: 'pointer' }}>
                    <img
                      className="toggle"
                      src={otherUser.userPhoto}
                      onClick={() => {
                        navigate(`/user/${reviewDetail.userSeq}`);
                      }}
                    ></img>
                    <span
                      onClick={() => {
                        navigate(`/user/${reviewDetail.userSeq}`);
                        // console.log('선택시 seq', reviewDetail.userSeq);
                      }}
                    >
                      작성자 : {otherUser.userNickname}
                    </span>

                    {checkFw ? (
                      <Button onClick={onUnfollow}>팔로잉</Button>
                    ) : // ) : (reviewDetail.userSeq = myuser.userSeq) ? (
                    reviewDetail.userSeq === myuser.userSeq ? (
                      <></>
                    ) : (
                      <Button onClick={onFollow}>팔로우</Button>
                    )}
                  </div>
                </div>
                <br></br>
                <p id="time">{reviewTime}</p>
                <br></br>
                <Rating name="read-only" value={reviewPoint} readOnly></Rating>
                <div>
                  <h3>{reviewDetail.postLocation}</h3>
                </div>
                <div>
                  <span>{reviewDetail.postAddress}</span>
                </div>
                <h4>{reviewDetail.postContent}</h4>
                {/* <p>{barriers}</p> */}
                <div>
                  <h2>지도</h2>
                  <div
                    id="myMap"
                    style={{
                      width: '100%',
                      height: '350px',
                      marginTop: '2rem',
                    }}
                  ></div>
                </div>

                <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
                {/* <p class="text-content">{reviewDetail.postContent}</p> */}
                <InfoIcon></InfoIcon>
                {/* <span class="location-name">{reviewDetail.postLocation}</span> */}
                <div class="comment-box">
                  <form onSubmit={onSubmitHandler}>
                    <input
                      class="comment-input"
                      placeholder="댓글을 입력하세요"
                      onChange={onCommentHandler}
                      value={newComment}
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
                        <CommentItem
                          comment={comment}
                          key={comment.cmtSeq}
                          onRemove={onRemove}
                          getCommentList={getCommentList}
                        />
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
        {/* )} */}
        <Dialog
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
          베리어 프리를 탈퇴하실 건가요?
        </DialogTitle> */}
          <DialogContent style={{ margin: 'auto' }}>
            <h3> 게시글을 삭제하실 건가요?</h3> <span>😢</span>
            <br></br>
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>잘못 눌렀어요</Button>
            <Button impact autoFocus onClick={onDelete}>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </ReviewBox>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;
