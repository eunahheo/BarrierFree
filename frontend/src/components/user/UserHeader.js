import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useSelector } from 'react-redux';

const UserHeaderBox = styled.div`
  display: flex;
  // flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;
  .div {
    display: table;
  }
  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};
    text-align: center;
    margin: auto;
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
  .smc {
    width: 150px;
    height: 150px;
  }
  .span {
    display: flex;
    // flex-dirextion: row;
    display: table-cell;
    vertical-align: middle;
  }
`;

const UserHeaderText = css`
  display: table-cell;
  vertical-align: middle;
`;
const UserHeader = ({ onPost, onFollowing, onFollower, onScrap }) => {
  const [userHeaderInfo, setUserHeaderInfo] = useState([]);
  const myuser = useSelector((state) => state.user.userData);
  const getUserHeader = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/myFeed/main',
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
  // getUserHeader();
  useEffect(() => {
    getUserHeader();
  }, []);
  return (
    <UserHeaderBox>
      <div>
        <div>
          <div>
            <img
              className="toggle"
              src={userHeaderInfo.userPhoto}
              onClick={onPost}
            />
          </div>
          <div>{userHeaderInfo.userNickname}</div>
        </div>
        <div onClick={onScrap}>
          <div className="toggle smc">
            <span>스크랩: {userHeaderInfo.postScrap}</span>
          </div>
          {/* <div>게시글수</div> */}
        </div>
        <div onClick={onFollowing}>
          <div className="toggle smc">팔로잉: {userHeaderInfo.following}</div>
          {/* <div>팔로잉:</div> */}
        </div>
        <div onClick={onFollower}>
          <div className="toggle smc">팔로워: {userHeaderInfo.follower}</div>
        </div>
      </div>
    </UserHeaderBox>
  );
};

export default UserHeader;
