import axios from 'axios';

export const FOLLOW = 'relationship/FOLLOW';
export const UNFOLLOW = 'relationship/UNFOLLOW';
export const CHECK_FW = 'relationship/CHECK';
export const RESET_RELATIONSHIP = 'relationship/INITIALIZE';
export const USER_FOLLOWINGS_COUNT = 'relationship/USER_FOLLOWINGS_COUNT';
export const USER_FOLLOWERS_COUNT = 'relationship/USER_FOLLOWINGS_COUNT';

export const follow = (mySeq, otherSeq) => {
  async function onFollow_actions() {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/follow',
        data: {
          userSeq: mySeq,
          followingSeq: otherSeq,
        },
      });
      return res.data;
    } catch (error) {
      // console.log(error);
      return 'error';
    }
  }
  const response = onFollow_actions();
  return { type: FOLLOW, payload: response };
};

export const unfollow = (mySeq, otherSeq) => {
  async function onUnfollow_actions() {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/unfollow',
        data: {
          userSeq: mySeq,
          followingSeq: otherSeq,
        },
      });
      return res.data;
    } catch (error) {
      // console.log(error);
      return 'error';
    }
  }
  const response = onUnfollow_actions();
  return { type: UNFOLLOW, payload: response };
};

export const checkfw = (userSeq, otherUserSeq) => {
  async function onCheckFw_actions() {
    try {
      const response2 = await axios({
        method: 'get',
        url: '/sns/isfollow',
        params: {
          otherUserSeq,
          userSeq,
        },
      });
      if (response2.data.isfollow === 'y') {
        return 'true';
      } else if (response2.data.isfollow === 'n') {
        return 'false';
      }
    } catch (e) {
      // console.log(e);
      // console.log('ERROR');
    }
  }
  const response = onCheckFw_actions();
  return { type: CHECK_FW, payload: response };
};

export const resetRelationship = () => {
  return { type: RESET_RELATIONSHIP };
};

// export const countFollowings = (currentUserSeq) => {
//   const res = axios({
//     method: 'get',
//     url: '/myFeed/main',
//     params: {
//       userSeq: 8,
//     },
//   });
//   return { type: USER_FOLLOWINGS_COUNT, payload: res.data };
// };

// export const countFollowers = (currentUserSeq) => {
//   const response = axios({
//     method: 'get',
//     url: '/myFeed/main',
//     params: {
//       userSeq: 8,
//     },
//   });

//   return { type: USER_FOLLOWERS_COUNT, payload: response.data[0].follower };
// };
