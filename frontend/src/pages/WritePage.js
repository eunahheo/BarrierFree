import { useSelector } from 'react-redux';
import EditorContainer from '../containers/write/EditorContainer';
import WriteBarrierIconContainer from '../containers/write/WriteBarrierIconContainer';
import ImageUploader from '../components/write/ImageUplader';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const WritePage = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <div>
      <hr></hr>
      {user ? (
        <div>
          <h1>WRITE PAGE</h1>
          {/* <Box>
            <Grid container spacing={12}>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}> */}
          {/* <ImageUploader></ImageUploader> */}
          {/* <WriteBarrierIconContainer></WriteBarrierIconContainer> */}
          {/* </Grid>
              <Grid item xs={5}> */}
          <EditorContainer></EditorContainer>
          {/* </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Box> */}
        </div>
      ) : (
        <div>notlogined</div>
      )}
    </div>
  );
};

export default WritePage;
