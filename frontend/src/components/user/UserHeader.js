import UserController from "./UserFeedTemplate";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { useSelector } from "react-redux";

const UserHeaderBox = styled.div`
  display: flex;
  // flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;
  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};

    width: 200px;
    height: 200px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      background: ${palette.pink[0]};
      color: white;
      cursor: pointer;
    }
  }
`;
const UserHeader = () => {
  const [userHeaderInfo, setUserHeaderInfo] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  const getUserHeader = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/myFeed/main",
        params: {
          userSeq: myuser.userSeq,
        },
      });
      console.log(response.data[0]);
      setUserHeaderInfo(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserHeader();
  }, []);
  return (
    <UserHeaderBox>
      <div>
        <div>
          <div>
            <img className="toggle" src={userHeaderInfo.userPhoto} />
          </div>
          <div>{userHeaderInfo.userNickname}</div>
        </div>
        <div>
          <div className="toggle">스크랩: {userHeaderInfo.postScrap}</div>
          {/* <div>게시글수</div> */}
        </div>
        <div>
          <div className="toggle">팔로잉: {userHeaderInfo.following}</div>
          {/* <div>팔로잉:</div> */}
        </div>
        <div>
          <div className="toggle">팔로워: {userHeaderInfo.follower}</div>
        </div>
      </div>
    </UserHeaderBox>
  );
};

export default UserHeader;
