import UserController from "./UserFeedTemplate";
import { useState, useEffect } from "react";
import axios from "axios";

function Userbar() {
  const [userfollowers, setUserfollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getfollower = async () => {
      try {
        setError(null);
        setUserfollowers([]);
        setLoading(true);
        const res = await axios({
          url: "/myFeed/follower",
          method: "get",
          params: {
            userSeq: 1,
          },
        });
        console.log("followers", { userfollowers });
        // setUserfollowers(Object.entries(res.data));
        // console.log(typeof userfollowers);
        // console.log(userfollowers.length);
        console.log("object 테스트", typeof Object.entries(userfollowers));
        setUserfollowers(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    getfollower();
    // 임시방편으로 해놓음. 렌더링 직후에 바로 axios 호출하니까 에러 발생
    if (userfollowers.length === 0) {
      getfollower();
    }
    // getfollower();
  }, []);
  // console.log("followers", { userfollowers });

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userfollowers) return null;
  console.log("저장 테스트", userfollowers);
  return (
    <div>
      {userfollowers.map((userfollower) => (
        <UserController
          userNickname={userfollower.userNickname}
          userPhoto={userfollower.userPhoto}
          userSeq={userfollower.userSeq}
          key={userfollower.userSeq}
        />
      ))}
    </div>
  );
}

export default Userbar;
