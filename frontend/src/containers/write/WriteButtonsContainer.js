import React from 'react';
import WriteButtons from '../../components/write/WriteButtons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const WriteButtonsContainer = ({ uploadImageWithAdtData }) => {
  const myuser = useSelector((state) => state.user.userData);
  // const writeUserSeq = myuserData.userSeq;
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {
    postTitle,
    postContent,
    postLocation,
    postSeq,
    postPoint,
    postAddress,
    postLat,
    postLng,
    deaf,
    infant,
    physical,
    visibility,
    senior,
    postPhoto,
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
    postAddress: write.postAddress,
    postLat: write.postLat,
    postLng: write.postLng,
    postPhoto: write.postPhoto,
    postSeq: write.postSeq,
  }));

  const onPublish = async () => {
    if (postSeq) {
      try {
        const response = await axios({
          method: 'put',
          url: '/post/update',
          data: {
            contentId: 0,
            postAddress,
            postContent,
            postLat,
            postLng,
            postLocation,
            postPoint,
            postTitle,
            userSeq: myuser.userSeq,
          },
          params: {
            postSeq,
            userSeq: myuser.userSeq,
          },
        });
        if (response.data === 'success') {
          const response2 = await axios({
            method: 'put',
            url: '/post/updateImpairment',
            data: { deaf, infant, physical, visibility, senior },
            params: {
              postSeq,
              userSeq: myuser.userSeq,
            },
          }).then(alert('수정이 완료되었습니다!'), navigate('/'));
        }
      } catch (e) {}
      return;
    }
    if (!postTitle) {
      alert('글을 작성해주세요!😉');
      return;
    }
    if (!postContent) {
      alert('후기를 적어주세요!😉');
      return;
    }
    if (!postLocation) {
      alert('장소를 검색하여 클릭해 주세요!😉');
      return;
    }
    if (!postAddress) {
      alert('장소를 검색하여 클릭해 주세요!😉');
      return;
    }
    uploadImageWithAdtData();
    // dispatch(
    //   writePost({
    //     postTitle,
    //     postContent,
    //     postLocation,
    //     postPoint,
    //     writeUserSeq,
    //     deaf,
    //     infant,
    //     physical,
    //     visibility,
    //     senior,
    //     postAddress,
    //     postLat,
    //     postLng,
    //     postPhoto,
    //   }),
    // );
    // alert('글이 등록되었습니다! 인클루시브에 한발짝 다가가셨습니다 😊');
    // dispatch(initialize());
  };
  return <WriteButtons onPublish={onPublish}></WriteButtons>;
};

export default WriteButtonsContainer;
