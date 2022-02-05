import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";
import './CommentItem.css';
import { commentDelete, commentUpdate } from '../../_actions/comment_actions';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';






const CommentItem = ({comment}) => {

  console.log(comment)
  const CommentTime = comment.comment.regDt.substring(0, 10)
  const commentNum = comment.comment.cmtSeq
  const commentContent = comment.comment.cmtContent

  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData)
  

  const onDeleteHandler = (event) => {
    event.preventDefault();
      // let body = {
      //   "cmtSeq": commentNum,
      //   "userSeq": myuser.userSeq
      // }
      // console.log(body)
      // axios.put('/post/comment/delete', body)
      axios({
        method: 'PUT',
        url:'/post/comment/delete',
        params: {
          cmtSeq: commentNum,
          userSeq: myuser.userSeq
        }
      })
      .then(console.log('yes'))
    }
  
    const onUpdateHandler = (event) => {
      event.preventDefault();
        let body = {
          "cmtContent": commentContent,
          "cmtSeq": commentNum,
          "userSeq": myuser.userSeq,
        }
    
        axios.put()
      }
  return(
    <div class="container">
      <div class="user-img">
        <AccountCircleIcon></AccountCircleIcon>
      </div>
      <div>
        <span class="comment-time">{CommentTime}</span> 
        <div>
          <span class="comment-content">{comment.comment.regId}<br/>{comment.comment.cmtContent}</span>
        </div>
        <p onClick={onDeleteHandler}>X</p>

        <p onClick={onUpdateHandler}>수정하기</p>
      </div>
    </div>
  )
}

export default CommentItem;