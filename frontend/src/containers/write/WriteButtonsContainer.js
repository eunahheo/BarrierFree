import React from 'react';
import WriteButtons from '../../components/write/WriteButtons';
import { useSelector } from 'react-redux';

const WriteButtonsContainer = ({ uploadImageWithAdtData }) => {
  const myuserData = useSelector((state) => state.user.userData);
  // const writeUserSeq = myuserData.userSeq;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {
    postTitle,
    postContent,
    postLocation,
    // postPoint,
    // deaf,
    // infant,
    // physical,
    // visibility,
    // senior,
    // postAddress,
    // postLat,
    // postLng,
    // postPhoto,
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
  }));

  const onPublish = () => {
    if (!postTitle) {
      alert('글을 작성해주세요!😉');
      return;
    }
    if (!postContent) {
      alert('후기를 적어주세요!😉');
      return;
    }
    if (!postLocation) {
      alert('장소를 검색하거나 입력해주세요!😉');
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
