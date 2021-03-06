import './App.css';
import SearchDetail from './components/search/SearchDetail';
import Recommend from './components/recommend/Recommend.js';
import About from './routes/About';
import Home from './routes/Home';
import UserPage from './pages/UserPage';
import User from './routes/User';
import Search from './components/search/Search';
import ReviewPage from './components/user/review/ReviewPage';
import NotFound from './routes/NotFound';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletedPage from './pages/RegisterCompletedPage';
import Review from './components/review/Review';
import RegisterPageKakao from './pages/RegisterPageKakao';
import RegisterEmailCheckPage from './pages/RegisterEmailCheckPage';
import LoginPage from './pages/LoginPage';
import TourInfomation from './components/search/TourInfomation';
import HeaderContainer from './containers/base/HeaderContainer';
import WritePage from './pages/WritePage';
import MyPage from './pages/MyPage';
import KakaoLoginPage from './pages/KakaoLoginPage';
import { resetParams } from './_actions/current_actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { alarm } from './_actions/user_actions';
function App() {
  const user = useSelector((state) => state.user.userData);
  const alarms = useSelector((state) => state.user.alarm);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/write" element={<WritePage />}></Route>
        <Route path="/recommend" exact={true} element={<Recommend />}></Route>
        <Route path="/search" exact={true} element={<Search />}></Route>
        <Route path="/search/tour" element={<SearchDetail />}></Route>
        <Route path="/about" exact={true} element={<About />}></Route>
        <Route path="/user" exact={true} element={<User />}></Route>
        <Route path="/user/:userSeq" exact={true} element={<User />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route
          path="/post/detail/:reviewCard"
          exact={true}
          element={<Review />}
        ></Route>
        <Route
          path="/recommend/detail/:infomationCard"
          exact={true}
          element={<TourInfomation />}
        ></Route>
        <Route path="/registerpage" element={<RegisterPage />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
        <Route path="/kakaologinpage" element={<KakaoLoginPage />}></Route>
        <Route
          path="/registerpage/kakao"
          element={<RegisterPageKakao />}
        ></Route>
        <Route
          path="user/email/certified"
          element={<RegisterCompletedPage />}
        ></Route>
        <Route
          path="/registerpage/emailcheck"
          element={<RegisterEmailCheckPage />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
