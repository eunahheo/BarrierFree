import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MyPageHeader from '../../components/mypage/MyPageHeader';

const MyPageHeaderContainerBlock = styled.div``;

const MyPageHeaderContainer = () => {
  const user = useSelector((state) => state.user.userData);
  // console.log(user);
  return <MyPageHeader user={user}></MyPageHeader>;
};

export default MyPageHeaderContainer;
