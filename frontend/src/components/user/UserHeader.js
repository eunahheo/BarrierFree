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
  .toggle:focus {
    background: ${palette.pink[0]};
    border: 1px solie ${palette.pink[0]};
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
  .cont2 {
    background: ${palette.pink[0]};
    color: white;
    cursor: pointer;
    text-align: center;
    margin: auto;
    width: 148px;
    height: 148px;
    border-radius: 100px;
    box-sizing: border-box;
  }
`;

const UserHeaderText = css`
  display: table-cell;
  vertical-align: middle;
`;

const UserHeader = ({ onPost, onFollowing, onFollower, onScrap }) => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);
  const [style, setStyle] = useState('toggle');
  const dispatch = useDispatch();

  const [userHeaderInfo, setUserHeaderInfo] = useState([]);
  const getUserHeader = async () => {
    try {
      console.log('checking:', currentUser, myuser);

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

  const currentFollowings = useSelector(
    (state) => state.relationship.total_followings,
  );

  const currentFollowers = useSelector(
    (state) => state.relationship.total_followers,
  );
  console.log(userHeaderInfo);
  useEffect(() => {
    getUserHeader();
  }, [currentUser, checkrelation]);
  console.log(userHeaderInfo);
  return (
    <UserHeaderBox>
      <div>
        <h1>{userHeaderInfo.userNickname}님의 피드</h1>
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
              }}
            >
              게시글: {userHeaderInfo.writePost}
            </span>
          </div>
        </div>
        <div onClick={onScrap}>
          <div className="toggle smc">스크랩: {userHeaderInfo.totalScarp}</div>
        </div>
        <div onClick={onFollowing}>
          <div className="toggle smc">팔로잉: {userHeaderInfo.following}</div>
        </div>
        <div onClick={onFollower}>
          <div className="toggle smc">팔로워: {userHeaderInfo.follower}</div>
        </div>
      </div>
    </UserHeaderBox>
  );
};

export default UserHeader;
