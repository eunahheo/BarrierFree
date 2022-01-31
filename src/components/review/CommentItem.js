import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";
import './CommentItem.css';

const CommentItem = ({comment}) => {
  const CommentTime = comment.comment.regDt.substring(0, 10)
  console.log(comment)
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
      </div>
    </div>
  )
}

export default CommentItem;