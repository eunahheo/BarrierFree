import React, { useState } from 'react';
import './CommentItemTest.css';
import { commentUpdate, commentDelete } from '../../_actions/comment_actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button.js';

const CommentItem = ({ comment, onRemove }) => {
  const CommentTime = comment.comment.regDt.substring(0, 10);
  const commentNum = comment.comment.cmtSeq;
  const [newComment, setNewComment] = useState('');
  const [check, setCheck] = useState(false);
  const onCommentHandler = (event) => {
    setNewComment(event.target.value);
  };
  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData);
  // console.log(myuser)

  const onDeleteHandler = (event) => {
    event.preventDefault();
    let params = {
      cmtSeq: commentNum,
      userSeq: myuser.userSeq,
    };
    onRemove(commentNum);
    dispatch(commentDelete(params));
    alert('댓글 삭제가 완료되었습니다. 😉');
  };

  const onUpdateHandler = (event) => {
    event.preventDefault();
    console.log(newComment);
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
  };

  const checkHandler = () => {
    if (check == true) setCheck(false);
    else setCheck(true);
    console.log(check);
  };

  return (
    <div class="container">
      <div class="user-img">
        <img src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"></img>
      </div>
      <div class="comment-info">
        <div>
          <p class="comment-userid">{comment.comment.regId}</p>
          {check == true ? (
            <div class="modifyt-box">
              <form onSubmit={onUpdateHandler}>
                <input
                  class="comment-input"
                  placeholder="댓글을 입력하세요"
                  onChange={onCommentHandler}
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
