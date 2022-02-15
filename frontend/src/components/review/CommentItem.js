import React, { useState } from 'react';
import './CommentItemTest.css';
import { commentUpdate, commentDelete } from '../../_actions/comment_actions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const CommentItemBox = styled.div`
  display: flex;
  flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;

  .toggle {
    text-align: center;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
`;

const CommentItem = ({ comment, onRemove, getCommentList }) => {
  const CommentTime = comment.comment.regDt.substring(0, 10);
  const commentNum = comment.comment.cmtSeq;
  const [newComment, setNewComment] = useState(comment.comment.cmtContent);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData);

  const onCommentHandler = (event) => {
    setNewComment(event.target.value);
  };
  const onDeleteHandler = (event) => {
    event.preventDefault();
    let params = {
      cmtSeq: commentNum,
      userSeq: myuser.userSeq,
    };
    onRemove(commentNum);
    dispatch(commentDelete(params));
    alert('댓글 삭제가 완료되었습니다. 😉');
    getCommentList();
  };

  const onUpdateHandler = (event) => {
    event.preventDefault();
    // console.log(newComment);
    if (newComment) {
      let params = {
        cmtSeq: commentNum,
        cmtContent: newComment,
        userSeq: myuser.userSeq,
      };
      dispatch(commentUpdate(params));
      alert('댓글 수정이 완료되었습니다. 😉');
      setCheck(false);
    } else {
      alert('댓글을 입력해주세요 😉');
    }
    getCommentList();
  };

  const checkHandler = () => {
    if (check == true) setCheck(false);
    else setCheck(true);
    // console.log(check);
  };

  return (
    <div class="container">
      <div class="user-img">
        <CommentItemBox>
          <img className="toggle" src={comment.userInfo[1]}></img>
        </CommentItemBox>
      </div>
      <div class="comment-info">
        <div>
          <p class="comment-userid">{comment.userInfo[0]}</p>
          {check == true ? (
            <div class="modifyt-box">
              <form onSubmit={onUpdateHandler}>
                <input
                  class="comment-input"
                  placeholder="댓글을 입력하세요"
                  onChange={onCommentHandler}
                  value={comment.comment.cmtContent}
                ></input>
                <button
                  class="update-button"
                  onClick={onUpdateHandler}
                  variant="contained"
                  type="submit"
                >
                  수정
                </button>
                <button class="delete-button" onClick={checkHandler}>
                  취소
                </button>
              </form>
            </div>
          ) : (
            <p class="comment-content">{comment.comment.cmtContent}</p>
          )}
        </div>
      </div>
      <div class="comment-time">
        <p>{CommentTime}</p>
        {comment.comment.userSeq == myuser.userSeq && check == false ? (
          <p>
            <button class="update-button" onClick={checkHandler}>
              수정
            </button>
            <button class="delete-button" onClick={onDeleteHandler}>
              삭제
            </button>
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
