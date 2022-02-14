import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/write/Editor';
import { initialize, changeField } from '../../_actions/write_actions';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const myuserData = useSelector((state) => state.user.userData);
  const userSeq = myuserData.userSeq;
  // 리덕스 스토어에서 title과 body를 불러옴
  // write라는 state를 찾고, 그것의 title과 body를 찾음
  // const { postTitle, postContent, postPoint } = useSelector(({ write }) => ({
  //   postTitle: write.postTitle,
  //   postContent: write.postContent,
  //   postPoint: write.postPoint,
  // }));
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
    postAddress,
    postLat,
    postLng,
    postPhoto,
    postAlt,
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
    postAlt: write.postAlt,
  }));
  // changeField가 'write/CHANGE_FIELD' 액션을 생성한다.
  // 그 액션에는 {key, value}라는 payload가 들어왓을 때 그 payload를 return하는 action
  const onChangeField = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  // 다시 들어왔을 때는 값 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    // 불러온 title과 body를 바보 editor에 전달
    <Editor
      onChangeField={onChangeField}
      postTitle={postTitle}
      postContent={postContent}
      postPoint={postPoint}
      postLocation={postLocation}
      userSeq={userSeq}
      deaf={deaf}
      infant={infant}
      physical={physical}
      visibility={visibility}
      senior={senior}
      postAddress={postAddress}
      postLat={postLat}
      postLng={postLng}
      postPhoto={postPhoto}
      postAlt={postAlt}
    ></Editor>
  );
};

export default EditorContainer;
