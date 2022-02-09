import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';
import { useParams } from 'react-router';

const UserFollowerBlock = styled.div`
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

const UserFollower = ({ userNickname, userPhoto, userSeq }) => {
  return (
    <UserFollowerBlock>
      <div className="UserController">
        <div>
          <div>
            <img src={userPhoto}></img>
            <span>{userNickname}</span>
            <Button>팔로우</Button>
            <Button>팔로잉</Button>
          </div>
        </div>
      </div>
    </UserFollowerBlock>
  );
};

const UserFollowers = () => {
  const [userfollowers, setUserfollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);

  useEffect(() => {
    const getfollower = async () => {
      try {
        setLoading(true);
        setError(null);
        setUserfollowers([]);
        if (currentUser === myuser) {
          const response = await axios({
            url: '/myFeed/follower',
            method: 'get',
            params: {
              userSeq: myuser,
            },
          });
          setUserfollowers(response.data);
        } else {
          const response = await axios({
            url: '/othersFeed/follower',
            method: 'get',
            params: {
              otherUserSeq: currentUser,
              userSeq: myuser,
            },
          });
          setUserfollowers(response.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getfollower();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userfollowers) return null;

  return (
    <div>
      <div>UserFollowers</div>
      {userfollowers.map((userfollower) => (
        <UserFollower
          // userfollower={userfollower}
          userNickname={userfollower.userNickname}
          userPhoto={userfollower.userPhoto}
          userSeq={userfollower.userSeq}
          key={userfollower.userSeq}
        />
      ))}
    </div>
  );
};

export default UserFollowers;
