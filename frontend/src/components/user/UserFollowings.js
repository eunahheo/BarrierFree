import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

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

const UserFollowing = ({
  onRemove,
  userNickname,
  userPhoto,
  isfollow,
  following_userSeq,
}) => {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const params = useParams();
  const currentUser = Number(params.userSeq);
  const navigate = useNavigate();
  const [checkFw, setCheckFw] = useState(false);

  useEffect(() => {
    if (isfollow === 'y') {
      setCheckFw(true);
    }
  }, []);

  const onUnfollow = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/unfollow',
        data: {
          userSeq: myuser,
          followingSeq: following_userSeq,
        },
      });

      onRemove(following_userSeq);
    } catch (error) {
      console.log(error);
    }
  };

  const onFollow = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/follow',
        data: {
          userSeq: myuser,
          followingSeq: following_userSeq,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onClick = () => {
    navigate(`/user/${following_userSeq}`);
  };

  return (
    <UserFollowingBlock>
      <div className="UserController">
        <div>
          <div>
            <img
              src={userPhoto}
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            ></img>
            <span onClick={onClick} style={{ cursor: 'pointer' }}>
              {userNickname}
            </span>
            {myuser === following_userSeq ? (
              <></>
            ) : checkFw ? (
              <Button onClick={onUnfollow}>팔로잉</Button>
            ) : (
              <Button onClick={onFollow}>팔로우</Button>
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
  const currentUser = Number(params.userSeq);

  useEffect(() => {
    const getfollowing = async () => {
      try {
        setLoading(true);
        setError(null);
        setUserfollowings([]);
        console.log(typeof currentUser, typeof myuser);
        // if (currentUser === myuser) {
        //   const response = await axios({
        //     url: '/myFeed/following',
        //     method: 'get',
        //     params: {
        //       userSeq: myuser,
        //     },
        //   });
        //   setUserfollowings(response.data);
        // } else
        {
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

  const onRemove = (id) => {
    setUserfollowings(
      userfollowings.filter((userfollowing) => userfollowing.userSeq !== id),
    );
  };

  return (
    <div>
      <h2>UserFollowings</h2>
      {userfollowings &&
        userfollowings.map((userfollowing) => (
          <UserFollowing
            key={userfollowing.userSeq}
            userfollowing={userfollowing}
            userNickname={userfollowing.userNickname}
            userPhoto={userfollowing.userPhoto}
            following_userSeq={userfollowing.userSeq}
            isfollow={userfollowing.isfollow}
            onRemove={onRemove}
          />
        ))}
      {userfollowings.length === 0 && <h1>팔로잉 없음</h1>}
    </div>
  );
};

export default UserFollowings;
