import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const UserHeaderBox = styled.div`
  display: flex;
  // flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  .div {
    display: table;
  }
  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};
    text-align: center;
    margin: auto;
    width: 130px;
    height: 130px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      background: ${palette.pink[0]};
      color: white;
      cursor: pointer;
    }
  }
  .toggle:focus {
    background: ${palette.pink[0]};
    border: 1px solie ${palette.pink[0]};
  }
  .smc {
    width: 95px;
    height: 95px;
  }
  .span {
    display: flex;
    // flex-dirextion: row;
    display: table-cell;
    vertical-align: middle;
  }
  .cont2 {
    background: ${palette.pink[0]};
    color: white;
    cursor: pointer;
    text-align: center;
    margin: auto;
    width: 150px;
    height: 150px;
    border-radius: 80px;
    box-sizing: border-box;
  }
  .text {
    z-index: 10;
    position: relative;
    color: #2d4059;
    font-size: 15px;
    font-weight: bold;
    // top: 35px;
    margin-top: 2px;
    margin-bottom: 20px;
  }
  .count {
    z-index: 10;
    position: relative;
    color: #2d4059;
    font-size: 35px;
    font-weight: bold;
    top: 30px;
  }
  .feed {
    font-size: 25px;
    font-weight: bold;
    padding: 30px 0 10px 0;
  }
`;

const UserHeader = ({ onPost, onFollowing, onFollower, onScrap }) => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);
  // const dispatch = useDispatch();

  const [userHeaderInfo, setUserHeaderInfo] = useState([]);
  const getUserHeader = async () => {
    try {
      // console.log('checking:', currentUser, myuser);

      if (currentUser === myuser) {
        const response = await axios({
          method: 'get',
          url: '/myFeed/main',
          params: {
            userSeq: currentUser,
          },
        });
        setUserHeaderInfo(response.data[0]);
      } else {
        const response = await axios({
          method: 'get',
          url: '/othersFeed/main',
          params: {
            otherUserSeq: currentUser,
            userSeq: myuser,
          },
        });
        setUserHeaderInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkrelation = useSelector(
    (state) => state.relationship.check_relationship,
  );

  // console.log(userHeaderInfo);
  useEffect(() => {
    getUserHeader();
  }, [currentUser, checkrelation]);
  // console.log(userHeaderInfo);
  return (
    <UserHeaderBox>
      <div>
        <div className="feed">{userHeaderInfo.userNickname}님의 피드</div>
        <div>
          <div>
            <img
              className="toggle"
              src={userHeaderInfo.userPhoto}
              onClick={onPost}
            />
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10',
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '10px 0 15px 0',
              }}
            >
              {userHeaderInfo.writePost}개의 게시글
            </span>
          </div>
        </div>
        <div onClick={onScrap}>
          <div className="toggle smc">
            <div className="count">{userHeaderInfo.totalScarp}</div>
          </div>
          <div className="text">스크랩</div>
        </div>
        <div onClick={onFollowing}>
          <div className="toggle smc">
            <div className="count">{userHeaderInfo.following}</div>
          </div>
          <div className="text">팔로잉</div>
        </div>
        <div onClick={onFollower}>
          <div className="toggle smc">
            <div className="count">{userHeaderInfo.follower}</div>
          </div>
          <div className="text">팔로워</div>
        </div>
      </div>
    </UserHeaderBox>
  );
};

export default UserHeader;
