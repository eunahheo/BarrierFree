import axios from 'axios';

export const FOLLOW = 'relationship/FOLLOW';
export const UNFOLLOW = 'relationship/UNFOLLOW';
export const CHECK_FW = 'relationship/CHECK';
export const RESET_RELATIONSHIP = 'relationship/INITIALIZE';

export const follow = (userSeq, followingSeq) => {
  async function onFollow() {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/follow',
        data: {
          userSeq,
          followingSeq,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }
  const response = onFollow();
  return { type: FOLLOW, payload: response };
};

export const unfollow = (userSeq, followingSeq) => {
  async function onUnfollow() {
    try {
      const res = await axios({
        method: 'post',
        url: '/sns/unfollow',
        data: {
          userSeq,
          followingSeq,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }
  const response = onUnfollow();
  return { type: UNFOLLOW, payload: response };
};

export const checkfw = (userSeq, otherUserSeq) => {
  async function onCheckFw() {
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
      console.log(e);
      console.log('ERROR');
    }
  }
  const response = onCheckFw();
  return { type: CHECK_FW, payload: response };
};

export const resetRelationship = () => {
  return { type: RESET_RELATIONSHIP };
};
