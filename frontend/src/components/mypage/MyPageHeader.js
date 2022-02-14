import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import MyPageContent from '../../components/mypage/MyPageContent';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeField } from '../../_actions/user_actions';

const MyPageHeaderBlock = styled.div`
  display: flex;
  // flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;
  .div {
    display: table;
  }
  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};
    text-align: center;
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      background: ${palette.pink[0]};
      color: white;
      cursor: pointer;
    }
  }
  .smc {
    width: 150px;
    height: 150px;
  }
  .span {
    display: flex;
    // flex-dirextion: row;
    display: table-cell;
    vertical-align: middle;
  }
`;

const MyPageHeader = ({ user }) => {
  const myuser = useSelector((state) => state.user.userData);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const token = localStorage.getItem('accessToken');
  // console.log(token);
  // const [postPhoto, setPostPhoto] = useState('');
  const dispatch = useDispatch();
  // const userPhoto = useSelector((state) => state.user.userData);
  const onUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImageData(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageWithAdtData = async () => {
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
        console.log(response.data);
        const response2 = await axios({
          method: 'put',
          url: '/user/modify',
          data: {
            userSeq: myuser.userSeq,
            userPhoto: response.data,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImagePreview(null);
        await dispatch(changeField({ key: 'userPhoto', value: response.data }));
        alert('프로필 사진 변경 완료!😉');
      } catch (error) {
        console.log(error);
        alert('에러 발생');
      }
    } else {
      alert('사진을 추가하세요😀');
    }
  };

  let inputRef;

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ width: '50%', margin: '30px auto' }}
    >
      <Grid item xs={6} md={4}>
        <MyPageHeaderBlock>
          <input
            type="file"
            id="upload-profile-image"
            capture="user"
            accept="image/*"
            onChange={onUpload}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: 'none' }}
          />
          <div>
            {imagePreview != null ? (
              <img className="toggle" src={imagePreview} />
            ) : (
              <img className="toggle" src={myuser.userPhoto} />
            )}
            {/* <img className="toggle" 
            src={user.userPhoto} /> */}
            <h2>{user.userNickname}님</h2>
            <label htmlFor="upload-profile-image">
              <Button
                variant="contained"
                component="span"
                onClick={() => inputRef.click()}
              >
                프로필 사진 변경
              </Button>
              <Button onClick={uploadImageWithAdtData}>저장</Button>
            </label>
          </div>
        </MyPageHeaderBlock>
      </Grid>
      <Grid item xs={6} md={8}>
        <div>
          <MyPageContent user={user}></MyPageContent>
        </div>
      </Grid>
    </Grid>
  );
};

export default MyPageHeader;
