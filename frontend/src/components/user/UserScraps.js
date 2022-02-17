import UserScrapsIn from './UserScrapsIn';
import UserScrapsOut from './UserScrapsOut';

const UserScraps = ({ getUserHeader }) => {
  return (
    <div>
      <UserScrapsIn getUserHeader={getUserHeader}></UserScrapsIn>
      <br></br>
      <br></br>
      <UserScrapsOut getUserHeader={getUserHeader}></UserScrapsOut>
    </div>
  );
};
export default UserScraps;
