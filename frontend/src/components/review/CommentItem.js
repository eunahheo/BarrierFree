import React, { useEffect } from 'react';
import './CommentItemTest.css';
import { commentDelete } from '../../_actions/comment_actions';
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

const CommentItem = ({ comment, onRemove }) => {
  useEffect(() => {}, []);
  // console.log(comment.comment);
  const CommentTime = comment.comment.regDt.substring(0, 10);
  const commentNum = comment.comment.cmtSeq;

  const dispatch = useDispatch();
  const myuser = useSelector((state) => state.user.userData);
  // console.log(myuser)
  console.log(comment);

  const onDeleteHandler = (event) => {
    event.preventDefault();
    let params = {
      cmtSeq: commentNum,
      userSeq: myuser.userSeq,
    };
    onRemove(commentNum);
    dispatch(commentDelete(params));
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
          <p class="comment-content">{comment.comment.cmtContent}</p>
        </div>
        {/* <p onClick={onUpdateHandler}>수정하기</p> */}
      </div>
      <div class="comment-time">
        <p>{CommentTime}</p>
        {comment.comment.userSeq == myuser.userSeq ? (
          <p onClick={onDeleteHandler} style={{ cursor: 'pointer' }}>
            [삭제]
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
