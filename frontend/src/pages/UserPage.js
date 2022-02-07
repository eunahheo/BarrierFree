import React from 'react';
import MyReviewPage from '../components/Reviews/MyReviewPage';
import UserFollowings from '../components/user/UserFollowings';
import UserFollowers from '../components/user/UserFollowers';
import UserScraps from '../components/user/UserScraps';

function UserPage({ type }) {
  return (
    <div>
      <h1>userpage</h1>

      {type === 'post' && (
        <MyReviewPage>
          <h2>userpage-myreviewpage</h2>
        </MyReviewPage>
      )}

      {type === 'following' && (
        <UserFollowings>
          <h2>userpage-followings</h2>
        </UserFollowings>
      )}

      {type === 'follower' && (
        <UserFollowers>
          <h2>userpage-followers</h2>
        </UserFollowers>
      )}

      {type === 'scrap' && (
        <UserScraps>
          <h2>userpage-scrap</h2>
        </UserScraps>
      )}
    </div>
  );
}

export default UserPage;
