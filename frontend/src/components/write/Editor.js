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
import { useSelector, useDispatch } from 'react-redux';
import WriteButtonsContainer from '../../containers/write/WriteButtonsContainer';
import Button from '../common/Button';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { changeField } from '../../_actions/write_actions';
import { Card, Container, CardActionArea, CardMedia } from '@mui/material';
import { writePost, initialize } from '../../_actions/write_actions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WriteBarrierIconContainer from '../../containers/write/WriteBarrierIconContainer';

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

const Editor = ({
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
  postAddress,
  postLat,
  postLng,
  postPhoto,
  onChangeField,
}) => {
  // const [files, setFiles] = useState('');
  // const [point, setPoint] = useState(0);

  // const onLoadFile = (event) => {
  //   const file = event.target.files;
  //   setFiles(file);
  //   console.log(files);
  // };

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

  // const classes = useStyles();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState('');
  // const [imageFile, setImageFile] = useState(null);
  // const image = useSelector((state) => state.upload.image);
  // handleuploadclick;
  const [loading, setLoading] = useState(false);
  const onUpload = (event) => {
    event.preventDefault();

    if (event.target.files[0]) {
      setLoading('loading');
    }

    const file = event.target.files[0];
    console.log(file);
    // const imageData = new FormData();
    // imageData.append('photo', file);
    setImageData(file);
    setLoading(true);
    console.log(imageData);
    // setImageData(imageData);
    // setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageWithAdtData = async () => {
    // 전송 보내기 전에 새로운 이름 붙이기
    // 이 부분은 imageData에 붙이지 말고 state값에 alt로 넘겨주기
    // imageData.append('postAlt', imageName);
    // dispatch(uploadImage(imageData));
    if (imageData) {
      const imageFile = new FormData();
      imageFile.append('photo', imageData);
      try {
        const response = await axios({
          method: 'post',
          url: '/upload/photo',
          data: imageFile,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // console.log(response);
        // alert('사진 등록이 완료되었습니다!😋');
        await dispatch(changeField({ key: 'postPhoto', value: response.data }));
        console.log(imageName);
        // await dispatch(changeField({ key: 'postAlt', value: response.data }));
        setImageData(null);
        setImagePreview(null);
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
            postAddress,
            postLat,
            postLng,
            postPhoto: response.data,
          }),
        );
        alert('글이 등록되었습니다! 인클루시브에 한발짝 다가가셨습니다 😊');
        dispatch(initialize());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('사진을 추가하세요😀');
    }
  };

  const onChange = (event) => {
    setImageName(event.target.value);
  };

  const onDelete = () => {
    setImagePreview(null);
    setImageData(null);
  };

  let inputRef;
  // useEffect(() => {
  //   preview();
  //   return () => preview();
  // }, []);
  // const preview = () => {
  //   if (!files) return false;
  //   const imgEl = document.querySelector('.img__box');
  //   const reader = new FileReader();

  //   reader.onLoad = () =>
  //     (imgEl.style.backgroundImage = `url(${reader.result})`);
  //   reader.readAsDataURL(files[0]);
  // };
  return (
    <div>
      <Box>
        <Grid container spacing={12}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="lefteditor">
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={
                      imagePreview != null
                        ? imagePreview
                        : 'https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg'
                    }
                  />
                </CardActionArea>
              </Card>

              <input
                type="file"
                id="upload-profile-image"
                capture="user"
                accept="image/*"
                onChange={onUpload}
                ref={(refParam) => (inputRef = refParam)}
                style={{ display: 'none' }}
              />
              <label htmlFor="upload-profile-image">
                <Button
                  variant="contained"
                  component="span"
                  onClick={() => inputRef.click()}
                >
                  파일 찾기
                </Button>
              </label>

              <Button onClick={onDelete}>올리기 취소</Button>

              {/* <Button component="span" onClick={uploadImageWithAdtData}>
          이미지 등록
        </Button> */}
              <input
                label="Image Name"
                name="name"
                onChange={onChange}
                value={imageName}
                placeholder="시각장애 분들을 위한 음성용 사진 설명을 적어주세요"
              />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="righteditor">
              <hr></hr>
              <h1>에디터용 이미지업로더</h1>
              <TitleInput
                placeholder="제목입력"
                onChange={onChangeTitle}
                value={postTitle}
              ></TitleInput>
              <div>
                <Rating
                  value={postPoint}
                  name="postPoint"
                  defaultValue={2.5}
                  precision={1}
                  size="large"
                  onChange={onChangePostPoint}
                />

                <span>{postPoint}</span>
              </div>
              <BodyTextarea
                placeholder="input내용 작성"
                onChange={onChangeBody}
              ></BodyTextarea>
              <WriteBarrierIconContainer></WriteBarrierIconContainer>
              <PlaceBoxContainer></PlaceBoxContainer>
              {/* {loadingWritePost && '등록 중입니다!'} */}
              {/* {!loadingWritePost && <WriteButtonsContainer></WriteButtonsContainer>} */}
              <WriteButtonsContainer
                uploadImageWithAdtData={uploadImageWithAdtData}
              ></WriteButtonsContainer>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Editor;
