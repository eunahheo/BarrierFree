import { useSelector } from "react-redux";
import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const myuser = useSelector((state) => state.user.userData);
  // const { user } = useSelector(({ user }) => ({ user: user.user }));
  // console.log(user);
  return <Header user={myuser} />;
};

export default HeaderContainer;
