import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';
import { useParams } from 'react-router';

const UserFollowingBlock = styled.div`
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

const UserFollowing = ({ userNickname, userPhoto, userSeq }) => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);
  const onUnfollow = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/unfollow',
        data: {
          userSeq: myuser,
          followingSeq: userSeq,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserFollowingBlock>
      <div className="UserController">
        <div>
          <div>
            <img src={userPhoto}></img>
            <span>{userNickname}</span>
            {currentUser === myuser ? (
              <Button onClick={onUnfollow}>팔로잉</Button>
            ) : (
              <Button>팔로우</Button>
            )}
          </div>
        </div>
      </div>
    </UserFollowingBlock>
  );
};

const UserFollowings = () => {
  const [userfollowings, setUserfollowings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = params.userSeq;

  useEffect(() => {
    const getfollowing = async () => {
      try {
        setLoading(true);
        setError(null);
        setUserfollowings([]);
        if (currentUser === myuser) {
          const response = await axios({
            url: '/myFeed/following',
            method: 'get',
            params: {
              userSeq: myuser,
            },
          });
          setUserfollowings(response.data);
        } else {
          const response = await axios({
            url: '/othersFeed/following',
            method: 'get',
            params: {
              otherUserSeq: currentUser,
              userSeq: myuser,
            },
          });
          setUserfollowings(response.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getfollowing();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userfollowings) return null;

  return (
    <div>
      <div>UserFollowings</div>
      {userfollowings.map((userfollowing) => (
        <UserFollowing
          userNickname={userfollowing.userNickname}
          userPhoto={userfollowing.userPhoto}
          userSeq={userfollowing.userSeq}
          key={userfollowing.userSeq}
        />
      ))}
    </div>
  );
};

export default UserFollowings;
