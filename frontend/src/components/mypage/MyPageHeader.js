import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import MyPageContent from '../../components/mypage/MyPageContent';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
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
let inputRef;

const MyPageHeader = ({ user }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState('');
  // const [imageFile, setImageFile] = useState(null);
  // const image = useSelector((state) => state.upload.image);
  // handleuploadclick;
  // const [loading, setLoading] = useState(false);
  // const onUpload = (event) => {
  //   event.preventDefault();

  //   if (event.target.files[0]) {
  //     setLoading('loading');
  //   }

  //   const file = event.target.files[0];
  //   console.log(file);
  //   // const imageData = new FormData();
  //   // imageData.append('photo', file);
  //   setImageData(file);
  //   setLoading(true);
  //   console.log(imageData);
  //   // setImageData(imageData);
  //   // setImageFile(file);
  //   setImagePreview(URL.createObjectURL(file));
  // };

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
            // onChange={onUpload}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: 'none' }}
          />
          <div>
            <img className="toggle" src={user.userPhoto} />
            <h2>{user.userNickname}님</h2>
            <label htmlFor="upload-profile-image">
              <Button
                variant="contained"
                component="span"
                onClick={() => inputRef.click()}
              >
                프로필 사진 변경
              </Button>
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
