import MyPageHeaderContainer from '../containers/mypage/MyPageHeaderContainer';
import MyPageContentContainer from '../containers/mypage/MyPageContentContainer';

const MyPage = () => {
  return (
    <div>
      <h1>mypage</h1>
      <MyPageHeaderContainer></MyPageHeaderContainer>
      <MyPageContentContainer></MyPageContentContainer>
    </div>
  );
};

export default MyPage;
