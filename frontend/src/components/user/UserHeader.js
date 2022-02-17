import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserInfo } from '../../_actions/current_actions';

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

const UserHeader = ({
  onPost,
  onFollowing,
  onFollower,
  onScrap,
  getUserHeader,
}) => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);
  const dispatch = useDispatch();

  const [userHeaderInfo, setUserHeaderInfo] = useState([]);

  const currentUserFeedInfo = useSelector(
    (state) => state.current.currentUserData,
  );

  const checkrelation = useSelector(
    (state) => state.relationship.check_relationship,
  );
  const getTempUserHeader = async () => {
    try {
      if (currentUser === myuser) {
        const response = await axios({
          method: 'get',
          url: '/myFeed/main',
          params: {
            userSeq: currentUser,
          },
        });
        setUserHeaderInfo(response.data[0]);
        // console.log('here', response.data[0]);
        dispatch(
          getCurrentUserInfo({
            key: 'follower',
            value: response.data[0].follower,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'writePost',
            value: response.data[0].writePost,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'following',
            value: response.data[0].following,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'totalScarp',
            value: response.data[0].totalScarp,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'userNickname',
            value: response.data[0].userNickname,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'userPhoto',
            value: response.data[0].userPhoto,
          }),
        );
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
  console.log('userHeaderInfo', userHeaderInfo.userPhoto);

  useEffect(() => {
    getTempUserHeader();
  }, [currentUser, checkrelation]);
  return (
    <UserHeaderBox>
      <div>
        <div className="feed">
          {myuser === currentUser ? (
            <span> {currentUserFeedInfo.userNickname} 님</span>
          ) : (
            <span>{userHeaderInfo.userNickname}님</span>
          )}
        </div>

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
              {myuser === currentUser ? (
                <span> {currentUserFeedInfo.writePost} 개의 게시글</span>
              ) : (
                <span>{userHeaderInfo.writePost} 개의 게시글</span>
              )}
            </span>
          </div>
        </div>
        <div onClick={onScrap}>
          <div className="toggle smc">
            <div className="count">
              {myuser === currentUser ? (
                <span> {currentUserFeedInfo.totalScarp}</span>
              ) : (
                <span>{userHeaderInfo.totalScarp}</span>
              )}
            </div>
          </div>
          <div className="text">스크랩</div>
        </div>
        <div onClick={onFollowing}>
          <div className="toggle smc">
            <div className="count">
              {myuser === currentUser ? (
                <span> {currentUserFeedInfo.following}</span>
              ) : (
                <span>{userHeaderInfo.following}</span>
              )}
            </div>
          </div>
          <div className="text">팔로잉</div>
        </div>
        <div onClick={onFollower}>
          <div className="toggle smc">
            <div className="count">
              {myuser === currentUser ? (
                <span> {currentUserFeedInfo.follower}</span>
              ) : (
                <span>{userHeaderInfo.follower}</span>
              )}
            </div>
          </div>
          <div className="text">팔로워</div>
        </div>
      </div>
    </UserHeaderBox>
  );
};

export default UserHeader;
