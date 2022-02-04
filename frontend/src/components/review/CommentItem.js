import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";
import './CommentItem.css';
import { commentDelete } from '../../_actions/comment_actions';
import { useDispatch, useSelector } from "react-redux";






const CommentItem = ({comment}) => {
  const CommentTime = comment.comment.regDt.substring(0, 10)
  const cmtNum = useParams();
  const commentNum = Number(cmtNum.reviewCard);

  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData)
  

  const onDeleteHandler = (event) => {
    event.preventDefault();
    console.log(myuser)
      let body = {
        "cmtSeq": commentNum,
        "userSeq": myuser.userSeq
      }
  
      dispatch(commentDelete(body))
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
      </div>
    </div>
  )
}

export default CommentItem;