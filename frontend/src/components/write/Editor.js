import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/StarBorder';
import axios from '../../../node_modules/axios/index';
import PlaceBoxContainer from '../../containers/write/PlaceBoxContainer';
import { useDispatch } from 'react-redux';
import WriteButtonsContainer from '../../containers/write/WriteButtonsContainer';
import Button from '../common/Button';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { changeField } from '../../_actions/write_actions';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { writePost, initialize } from '../../_actions/write_actions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WriteBarrierIconContainer from '../../containers/write/WriteBarrierIconContainer';
import TextField from '@mui/material/TextField';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import UploadImage from '../images/uploadImage.png';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#EA5455',
  },
});

const Editor = ({
  postTitle,
  postContent,
  postLocation,
  postPoint,
  userSeq,
  contentId,
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
  postAlt,
}) => {
  const navigate = useNavigate();
  const onChangeTitle = (e) => {
    onChangeField({ key: 'postTitle', value: e.target.value });
  };

  const onChangeBody = (e) => {
    onChangeField({ key: 'postContent', value: e.target.value });
  };

  const onChangePostPoint = (e) => {
    onChangeField({ key: 'postPoint', value: e.target.value });
  };

  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState(postAlt);

  const [loading, setLoading] = useState(false);
  const onUpload = (event) => {
    event.preventDefault();

    if (event.target.files[0]) {
      setLoading('loading');
    }

    const file = event.target.files[0];
    // const imageData = new FormData();
    // imageData.append('photo', file);
    setImageData(file);
    setLoading(true);
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
        // alert('사진 등록이 완료되었습니다!😋');
        await dispatch(changeField({ key: 'postPhoto', value: response.data }));
        await dispatch(changeField({ key: 'postAlt', value: imageName }));
        // await dispatch(changeField({ key: 'postAlt', value: response.data }));
        setImageData(null);
        setImagePreview(null);
        dispatch(
          writePost({
            postTitle,
            postContent,
            postLocation,
            postPoint,
            userSeq,
            contentId,
            deaf,
            infant,
            physical,
            visibility,
            senior,
            postAddress,
            postLat,
            postLng,
            postPhoto: response.data,
            postAlt: imageName,
          }),
        );
        alert('글이 등록되었습니다! 베리어프리에 한발짝 다가가셨습니다 😊');
        dispatch(initialize());
        navigate('/');
      } catch (error) {
        // console.log(error);
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

  return (
    <div>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="lefteditor">
              <Card sx={{ maxHeiht: 600 }}>
                <CardActionArea>
                  <label htmlFor="upload-profile-image">
                    <CardMedia
                      height="400"
                      component="img"
                      image={
                        postPhoto
                          ? postPhoto
                          : imagePreview != null
                          ? imagePreview
                          : UploadImage
                      }
                      // image={imagePreview != null ? imagePreview : UploadImage}
                    />
                  </label>
                </CardActionArea>
              </Card>
              <br />
              <input
                type="file"
                id="upload-profile-image"
                // capture="user"
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
              &nbsp;
              <Button onClick={onDelete}>올리기 취소</Button>
              {/* <Button component="span" onClick={uploadImageWithAdtData}>
          이미지 등록
        </Button> */}
              <br /> <br />
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <RecordVoiceOverIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  name="name"
                  onChange={onChange}
                  value={imageName}
                  placeholder="음성용 사진 설명을 적어주세요"
                  id="input-with-sm"
                  variant="standard"
                  sx={{ width: '100%' }}
                />
              </Box>
              {/* <TextField
              // label="Image Name"
              /> */}
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="righteditor">
              <div>
                <TextField
                  // width="60"
                  inputProps={{ style: { fontSize: 30, fontWeight: 'bold' } }}
                  placeholder="제목"
                  onChange={onChangeTitle}
                  value={postTitle}
                  variant="standard"
                ></TextField>
                <br></br>
                <br></br>
                <StyledRating
                  value={postPoint}
                  name="postPoint"
                  defaultValue={0}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? 's' : ''}`
                  }
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  precision={1}
                  size="large"
                  onChange={onChangePostPoint}
                />
              </div>
              <br />
              <br />
              <TextField
                id="standard-multiline-static"
                multiline
                rows={8}
                variant="standard"
                onChange={onChangeBody}
                value={postContent}
                fullWidth
                placeholder="여행 후기와 장소에 대한 설명을 작성해주세요"
              />

              <WriteBarrierIconContainer></WriteBarrierIconContainer>
              <br />
              <PlaceBoxContainer></PlaceBoxContainer>
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
