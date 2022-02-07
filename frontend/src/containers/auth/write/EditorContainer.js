import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../../components/write/Editor';
import { initialize, changeField } from '../../../_actions/write_actions';

const EditorContainer = () => {
  const dispatch = useDispatch();
  // 리덕스 스토어에서 title과 body를 불러옴
  // write라는 state를 찾고, 그것의 title과 body를 찾음
  const { title, body, loadingWritePost } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    loadingWritePost: write.loading.WRITE_POST,
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
      title={title}
      body={body}
      loadingWritePost={loadingWritePost}
    ></Editor>
  );
};

export default EditorContainer;
