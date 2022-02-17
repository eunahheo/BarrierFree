import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import Button from '../common/Button';
import axios from '../../../node_modules/axios/index';
import { changeField } from '../../_actions/write_actions';

function ImageUploader() {
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
    // console.log(file);
    // const imageData = new FormData();
    // imageData.append('photo', file);
    setImageData(file);
    setLoading(true);
    // console.log(imageData);
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
        alert('등록이 완료되었습니다!😋');
        setImageData(null);
        dispatch(changeField({ key: 'postPhoto', value: response.data }));
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

      <Button component="span" onClick={uploadImageWithAdtData}>
        이미지 등록
      </Button>
      <input
        label="Image Name"
        name="name"
        onChange={onChange}
        value={imageName}
        placeholder="시각장애 분들을 위한 음성용 사진 설명을 적어주세요"
      />
    </div>
  );
}

export default ImageUploader;
