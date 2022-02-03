import React, { useState } from "react";
import "./App.css";
import Recommend from "./components/recommend/Recommend.js";
import About from "./routes/About";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import UserPage from "./routes/UserPage";
import User from "./routes/User";
import Search from "./components/search/Search";
import Login from "./components/user/Login"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Review from "./components/review/Review";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
// import Signup from "./components/user/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" exact={true} element={<Home />}></Route>
          <Route path="/search" exact={true} element={<Search />}></Route>
          <Route path="/about" exact={true} element={<About />}></Route>
          <Route path="/recommend" exact={true} element={<Recommend />}></Route>
          <Route path="/user" exact={true} element={<User />}></Route>
          {/* <Route path="/signup" exact={true} element={<Signup />}></Route> */}
          <Route path="/login" exact={true} element={<Login />}></Route>
          <Route path="/userpage" exact={true} element={<UserPage />}></Route>
          <Route path="/post/detail/:reviewCard" exact={true} element={<Review />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
