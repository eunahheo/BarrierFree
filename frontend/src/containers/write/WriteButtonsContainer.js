import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteButtons from '../../components/write/WriteButtons';
import { writePost } from '../../_actions/write_actions';

const WriteButtonsContainer = () => {
  const myuserData = useSelector((state) => state.user.userData);
  const writeUserSeq = myuserData.userSeq;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    postTitle,
    postContent,
    postLocation,
    postPoint,
    deaf,
    infant,
    physical,
    visibility,
    senior,
  } = useSelector(({ write }) => ({
    postTitle: write.postTitle,
    postContent: write.postContent,
    postLocation: write.postLocation,
    postPoint: write.postPoint,
    deaf: write.deaf,
    infant: write.infant,
    physical: write.physical,
    visibility: write.visibility,
    senior: write.senior,
  }));
  // const myuser = useSelector((state) => state.user.userData);
  // const [writeUserSeq, setWriteUserSeq] = useState(null);
  // setWriteUserSeq(myuser.userSeq);

  const onPublish = () => {
    dispatch(
      writePost({
        postTitle,
        postContent,
        postLocation,
        postPoint,
        writeUserSeq,
        deaf,
        infant,
        physical,
        visibility,
        senior,
      }),
    );
  };
  return <WriteButtons onPublish={onPublish}></WriteButtons>;
};

export default WriteButtonsContainer;
