// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// function ImageUploader() {
//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onabort = () => console.log('file reading was aborted');
//       reader.onerror = () => console.log('file reading has failed');
//       reader.onload = () => {
//         // Do whatever you want with the file contents
//         const binaryStr = reader.result;
//         console.log(binaryStr);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   }, []);
//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files</p>
//     </div>
//   );
// }

// export default ImageUploader;

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Card, Container, CardActionArea, CardMedia } from '@mui/material';
import Button from '../common/Button';
import { uploadImage } from '../../_actions/upload_actions';
import axios from '../../../node_modules/axios/index';

function ImageUploader() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const image = useSelector((state) => state.upload.image);
  // handleuploadclick;
  const onUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const imageData = new FormData();
    imageData.append('imageFile', file);
    setImageData(imageData);

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageWithAdtData = () => {
    // 전송 보내기 전에 새로운 이름 붙이기
    // 이 부분은 imageData에 붙이지 말고 state값에 alt로 넘겨주기
    // imageData.append('postAlt', imageName);
    dispatch(uploadImage(imageData));
    try {
      const response = axios({
        method: 'post',
        url: '/upload/photo',
        formData: imageData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
      <input
        label="Image Name"
        name="name"
        onChange={onChange}
        value={imageName}
        placeholder="시각장애 분들을 위한 음성용 사진 설명을 적어주세요"
      />
      <Button component="span" onClick={uploadImageWithAdtData}>
        temp 이미지 등록
      </Button>
    </div>
  );
}

export default ImageUploader;
