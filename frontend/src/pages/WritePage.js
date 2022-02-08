import { useSelector } from 'react-redux';
import EditorContainer from '../containers/auth/write/EditorContainer';
import axios from 'axios';
import WriteBarrierIconContainer from '../containers/auth/write/WriteBarrierIconContainer';

const WritePage = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <div>
      <h1>WRITE PAGE</h1>
      <hr></hr>
      {user ? (
        <div>
          userlogined
          <WriteBarrierIconContainer></WriteBarrierIconContainer>
          <EditorContainer></EditorContainer>
        </div>
      ) : (
        <div>notlogined</div>
      )}
    </div>
  );
};

export default WritePage;
