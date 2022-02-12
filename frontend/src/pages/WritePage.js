import { useSelector } from 'react-redux';
import EditorContainer from '../containers/write/EditorContainer';
import WriteBarrierIconContainer from '../containers/write/WriteBarrierIconContainer';
import ImageUploader from '../components/write/ImageUplader';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import palette from '../lib/styles/palette';

const WriteTemplate = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WritePage = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <WriteTemplate>
      <br />
      {user ? (
        <Container fixed>
          <Card
            fixed
            sx={{
              maxWidth: 880,
              maxHeight: 650,
              margin: 'auto',
              boxShadow:
                'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
              borderRadius: 4,
            }}
          >
            <br /> <br />
            {/* <h1>글 작성</h1> */}
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
          </Card>
        </Container>
      ) : (
        <div>notlogined</div>
      )}
    </WriteTemplate>
  );
};

export default WritePage;
