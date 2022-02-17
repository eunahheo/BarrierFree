import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
  getUserHeader,
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
    } else if (myuser === currentUser) {
      setCheckFw(true);
      // console.log('check', currentUser, myuser, checkFw);
    }
  }, []);

  const onUnfollow = async () => {
    getUserHeader();
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/unfollow',
        data: {
          userSeq: myuser,
          followingSeq: following_userSeq,
        },
      });
      setCheckFw(false);
      if (myuser === currentUser) {
        onRemove(following_userSeq);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const onFollow = async () => {
    getUserHeader();
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/follow',
        data: {
          userSeq: myuser,
          followingSeq: following_userSeq,
        },
      });
      setCheckFw(true);
    } catch (error) {
      // console.log(error);
    }
  };
  const onClick = () => {
    navigate(`/user/${following_userSeq}`);
  };

  return (
    <UserFollowingBlock>
      <div className="UserController" style={{ paddingBottom: '1rem' }}>
        <Grid
          container
          spacing={5}
          columns={15}
          display="flex"
          justify="center"
          width="500px"
          height="120px"
        >
          <Grid item xs={5} display="flex" justify="center" width="150px">
            <img
              src={userPhoto}
              onClick={onClick}
              style={{
                cursor: 'pointer',
                verticalAlign: 'middle',
              }}
            ></img>
          </Grid>
          <Grid
            item
            xs={5}
            display="flex"
            justify="middle"
            direction="row"
            marginTop="3rem"
          >
            <span
              onClick={onClick}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                marginRight: '1rem',
                verticalAlign: 'middle',
              }}
            >
              {userNickname}
            </span>
          </Grid>
          <Grid
            item
            xs={5}
            display="flex"
            justify="center"
            direction="column"
            marginTop="2.6rem"
          >
            {myuser === following_userSeq ? (
              <></>
            ) : checkFw ? (
              <Button impact onClick={onUnfollow}>
                언팔로우
              </Button>
            ) : (
              <Button onClick={onFollow}>팔로우</Button>
            )}
          </Grid>
        </Grid>
      </div>
    </UserFollowingBlock>
  );
};

const UserFollowings = ({ getUserHeader }) => {
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
        // console.log(typeof currentUser, typeof myuser);
        if (currentUser === myuser) {
          const response = await axios({
            url: '/myFeed/following',
            method: 'get',
            params: {
              userSeq: myuser,
            },
          });
          setUserfollowings(response.data);
          // console.log('myfeed', userfollowings);
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
          // console.log('fowllowing', response.data);
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
  // if (error) return <div>에러가 발생했습니다</div>;
  if (!userfollowings) return null;

  const onRemove = (id) => {
    setUserfollowings(
      userfollowings.filter((userfollowing) => userfollowing.userSeq !== id),
      getUserHeader(),
    );
  };

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <Box
        sx={{
          width: '90%',
        }}
      >
        <h4>팔로잉</h4>
        <hr></hr>
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
              getUserHeader={getUserHeader}
            />
          ))}
        {userfollowings.length === 0 && (
          <div>
            <h1>배리어프리에서 새 친구를 만날 수 있어요! 🙂</h1>
          </div>
        )}
      </Box>
    </div>
  );
};

export default UserFollowings;
