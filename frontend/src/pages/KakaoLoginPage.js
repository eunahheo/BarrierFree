import AuthTemplate from '../components/auth/AuthTemplate';
import KakaoOauth from '../containers/auth/KakaoOauth';

const KakaoLoginPage = () => {
  return (
    <AuthTemplate>
      <KakaoOauth />
    </AuthTemplate>
  );
};

export default KakaoLoginPage;
