import React from 'react';
import UserReview from '../components/user/UserReview';
import UserFollowings from '../components/user/UserFollowings';
import UserFollowers from '../components/user/UserFollowers';
import UserScraps from '../components/user/UserScraps';
import { useEffect } from 'react';
import { useParams } from 'react-router';
function UserPage({ type, getUserHeader }) {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {type === 'post' && (
        <UserReview>
          <h2>userpage-myreviewpage</h2>
        </UserReview>
      )}

      {type === 'following' && (
        <UserFollowings getUserHeader={getUserHeader}>
          <h2>userpage-followings</h2>
        </UserFollowings>
      )}

      {type === 'follower' && (
        <UserFollowers getUserHeader={getUserHeader}>
          <h2>userpage-followers</h2>
        </UserFollowers>
      )}

      {type === 'scrap' && (
        <UserScraps getUserHeader={getUserHeader}>
          <h2>userpage-scrap</h2>
        </UserScraps>
      )}
    </div>
  );
}

export default UserPage;
