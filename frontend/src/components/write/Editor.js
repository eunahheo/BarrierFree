import { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import axios from '../../../node_modules/axios/index';
import PlaceBox from './PlaceBox';
import WriteButtons from './WriteButtons';
import PlaceBoxContainer from '../../containers/write/PlaceBoxContainer';
import { useSelector } from 'react-redux';
import WriteButtonsContainer from '../../containers/write/WriteButtonsContainer';
import Button from '../common/Button';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 2.5rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[0]};
  margin-bottom: 2rem;
  width: 100%;
`;

const BodyTextarea = styled.textarea`
  font-size: 1.125rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[0]};
  margin-bottom: 2rem;
  width: 100%;
  min-height: 300px;
  line-height: 2;
  text-align: left;
  padding-top: 0px;
  vertical-align: top;
  text-align: start;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 300px;
    font-size: 1.125rem;
    line-height: 2;
  }
`;

const Editor = ({ onChangeField, postTitle, postContent, postPoint }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [files, setFiles] = useState('');
  const [point, setPoint] = useState(0);

  const onLoadFile = (event) => {
    const file = event.target.files;
    setFiles(file);
    console.log(files);
  };

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      placeholder: '내용 작성란',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
      theme: 'bubble',
    });
  }, []);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'postTitle', value: e.target.value });
  };

  const onChangeBody = (e) => {
    console.log('changebody', e);
    onChangeField({ key: 'postContent', value: e.target.value });
  };

  const onChangePostPoint = (e) => {
    console.log('changepostpoint', e);
    onChangeField({ key: 'postPoint', value: e.target.value });
  };
  useEffect(() => {
    preview();
    return () => preview();
  }, []);
  const preview = () => {
    if (!files) return false;
    const imgEl = document.querySelector('.img__box');
    const reader = new FileReader();

    reader.onLoad = () =>
      (imgEl.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(files[0]);
  };
  return (
    // <EditorBlock>
    <div>
      <hr></hr>
      <TitleInput
        placeholder="제목입력"
        onChange={onChangeTitle}
        value={postTitle}
      ></TitleInput>
      <Rating
        value={postPoint}
        name="postPoint"
        defaultValue={2.5}
        precision={1}
        size="large"
        onChange={onChangePostPoint}
      />
      <span>{postPoint}</span>
      <BodyTextarea
        placeholder="input내용 작성"
        onChange={onChangeBody}
      ></BodyTextarea>
      <PlaceBoxContainer></PlaceBoxContainer>
      {/* {loadingWritePost && '등록 중입니다!'} */}
      {/* {!loadingWritePost && <WriteButtonsContainer></WriteButtonsContainer>} */}
      <WriteButtonsContainer></WriteButtonsContainer>
    </div>
  );
};

export default Editor;
