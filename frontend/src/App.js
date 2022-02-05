import React, { useState } from 'react';
import './App.css';
import Recommend from './components/recommend/Recommend.js';
import About from './routes/About';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import UserPage from './pages/UserPage';
import User from './routes/User';
import Search from './components/search/Search';
import ReviewPage from './components/Reviews/ReviewPage';
import NotFound from './routes/NotFound';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletedPage from './pages/RegisterCompletedPage';
import Review from './components/review/Review';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
// import Signup from "./components/user/Signup";
import RegisterPageKakao from './pages/RegisterPageKakao';
import RegisterEmailCheckPage from './pages/RegisterEmailCheckPage';
import LoginPage from './pages/LoginPage';
import TourInfomation from './components/search/TourInfomation';
import HeaderContainer from './components/containers/HeaderContainer';

function App() {
  // var cors = require("cors");
  // var app = express();
  // app.use(cors());
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      <HeaderContainer></HeaderContainer>
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/search" exact={true} element={<Search />}></Route>
        <Route path="/about" exact={true} element={<About />}></Route>
        <Route path="/recommend" exact={true} element={<Recommend />}></Route>
        <Route path="/user" exact={true} element={<User />}></Route>
        <Route path="/userpage" exact={true} element={<UserPage />}></Route>
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
        <Route path="/reviewpage" element={<ReviewPage />}></Route>
        <Route path="/registerpage" element={<RegisterPage />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
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
