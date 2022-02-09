import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../_actions/user_actions';

const HeaderContainer = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
