import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import RegisterForm from "../components/auth/RegisterForm";
import RegisterKaKaoForm from "../components/auth/RegisterKakaoForm";

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterKaKaoForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
