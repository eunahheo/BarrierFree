import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';

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
  return (
    <UserFollowingBlock>
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
    </UserFollowingBlock>
  );
};

const UserFollowings = () => {
  const [userfollowings, setUserfollowings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const myuser = useSelector((state) => state.user.userData);

  useEffect(() => {
    const getfollowing = async () => {
      try {
        setError(null);
        setUserfollowings([]);
        setLoading(true);
        const res = await axios({
          url: '/myFeed/following',
          method: 'get',
          params: {
            userSeq: myuser.userSeq,
          },
        });
        setUserfollowings(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    getfollowing();
  }, []);
  console.log(userfollowings);
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
