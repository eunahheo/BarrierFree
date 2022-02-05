import UserFollowerP from "./UserFollowerP";
import { useState, useEffect } from "react";
import axios from "axios";
import { AirlineSeatLegroomReducedRounded } from "@mui/icons-material";
import Button from "../common/Button";
import styled from "styled-components";

const UserControllerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  img {
    margin: 1.5rem 0.75rem 0;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    box-sizing: border-box;
  }
`;
const UserController = ({ userNickname, userPhoto, userSeq }) => {
  // console.log("controller::", userfollowers[0].userNickname);
  // const userfollower = userfollowers[0];
  // const userSeq = 1;

  return (
    <UserControllerBlock>
      <div className="UserController">
        <div>
          <div>
            {/* {userfollowers.map((userfollower) => (
            <span>{userfollower}</span>
            // <UserFollowerP
            //   userNickname={userfollower.userNickname}
            //   userPhoto={userfollower.userPhoto}
            //   userSeq={userfollower.userSeq}
            //   key={userfollower.userSeq}
            // />
          ))} */}
            <img src={userPhoto}></img>
            <span>{userNickname}</span>
            <Button>팔로우</Button>
            <Button>팔로잉</Button>
          </div>
        </div>
      </div>
    </UserControllerBlock>
  );
};

export default UserController;
