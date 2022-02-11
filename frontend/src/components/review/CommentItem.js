import React from 'react';
import './CommentItemTest.css';
import { commentDelete } from '../../_actions/comment_actions';
import { useDispatch, useSelector } from "react-redux";


const CommentItem = ({ comment, onRemove }) => {
  const CommentTime = comment.comment.regDt.substring(0, 10)
  const commentNum = comment.comment.cmtSeq

  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData)
  console.log(myuser)

  const onDeleteHandler = (event) => {
    event.preventDefault();
      let params = {
        "cmtSeq": commentNum,
        "userSeq": myuser.userSeq
      }
      onRemove(commentNum)
      dispatch(commentDelete(params))
    }

  return(
    <div class="container">
      <div class="user-img">
        <img src='https://dummyimage.com/50x50/ced4da/6c757d.jpg'></img>
      </div>
      <div class="comment-info">
        <div>
          <p class="comment-userid">{comment.comment.regId}</p>
          <p class="comment-content">{comment.comment.cmtContent}</p>
        </div>
        {/* <p onClick={onUpdateHandler}>수정하기</p> */}
      </div>
      <div class="comment-time">
        <p>{CommentTime}</p> 
        {comment.comment.userSeq == myuser.userSeq ? <p onClick={onDeleteHandler}>[삭제]</p> : <p></p>}
      </div>
    </div>
  )
}

export default CommentItem;