import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import palette from '../../lib/styles/palette';
import Grid from '@mui/material/Grid';

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

const UserFollower = ({
  userNickname,
  userPhoto,
  follower_userSeq,
  isfollow,
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
          followingSeq: follower_userSeq,
        },
      });
      setCheckFw(false);
    } catch (error) {
      console.log(error);
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
          followingSeq: follower_userSeq,
        },
      });
      setCheckFw(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onClick = () => {
    navigate(`/user/${follower_userSeq}`);
  };

  return (
    <UserFollowerBlock>
      <div className="UserController" style={{ paddingBottom: '1rem' }}>
        <Grid
          container
          spacing={5}
          columns={15}
          display="flex"
          justify="center"
          width="500px"
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
            {myuser === follower_userSeq ? (
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
          console.log(response.data);
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
        console.log(error.response.data);
        if (error.response.data === 'fail') {
          setError('팔로워가 없습니다.');
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getfollower();
  }, []);

  if (loading) return <div>로딩중..</div>;
  // if (error) return <div>{error}</div>;
  if (!userfollowers) return null;

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <Box
        sx={{
          width: '90%',
        }}
      >
        <h4>팔로워</h4>
        <hr></hr>
        {userfollowers &&
          userfollowers.map((userfollower) => (
            <UserFollower
              key={userfollower.userSeq}
              isfollow={userfollower.isfollow}
              userNickname={userfollower.userNickname}
              userPhoto={userfollower.userPhoto}
              follower_userSeq={userfollower.userSeq}
            />
          ))}
        {myuser === currentUser && userfollowers.length === 0 && (
          <div>
            <h1>팔로워가 없습니다.</h1>
            <h1>배리어프리에서 새 친구를 만날 수 있어요! 🙂</h1>
          </div>
        )}
      </Box>
    </div>
  );
};

export default UserFollowers;
