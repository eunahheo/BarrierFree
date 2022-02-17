import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MyPageContent from '../../components/mypage/MyPageContent';

const MyPageContentContainerBlock = styled.div``;

const MyPageContentContainer = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <MyPageContentContainerBlock>
      <MyPageContent user={user}></MyPageContent>
    </MyPageContentContainerBlock>
  );
};

export default MyPageContentContainer;
