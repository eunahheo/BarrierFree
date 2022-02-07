import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';

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
  const myuser = useSelector((state) => state.user.userData);

  useEffect(() => {
    const getfollower = async () => {
      try {
        setError(null);
        setUserfollowers([]);
        setLoading(true);
        const res = await axios({
          url: '/myFeed/follower',
          method: 'get',
          params: {
            userSeq: myuser.userSeq,
          },
        });
        setUserfollowers(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    getfollower();
  }, []);
  console.log(userfollowers);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userfollowers) return null;

  return (
    <div>
      <div>UserFollowers</div>
      {userfollowers.map((userfollower) => (
        <UserFollower
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
