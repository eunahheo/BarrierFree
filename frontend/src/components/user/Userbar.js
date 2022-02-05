import UserController from "./UserFeedTemplate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Userbar() {
  const [userfollowers, setUserfollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const myuser = useSelector((state) => state.user.userData);
  console.log("myusertest", myuser);
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
