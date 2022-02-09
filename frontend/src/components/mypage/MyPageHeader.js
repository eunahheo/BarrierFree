import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const MyPageHeaderBlock = styled.div`
  display: flex;
  // flex-dirextion: row;
  align-items: center;
  justify-content: flex-start;
  .div {
    display: table;
  }
  .toggle {
    background: ${palette.gray[0]};
    color: ${palette.blue[0]};
    text-align: center;
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    box-sizing: border-box;
    &:hover {
      background: ${palette.pink[0]};
      color: white;
      cursor: pointer;
    }
  }
  .smc {
    width: 150px;
    height: 150px;
  }
  .span {
    display: flex;
    // flex-dirextion: row;
    display: table-cell;
    vertical-align: middle;
  }
`;

const MyPageHeader = ({ user }) => {
  return (
    <MyPageHeaderBlock>
      <div>
        <img className="toggle" src={user.userPhoto} />
        <h2>{user.userNickname}님</h2>
        <Button>프로필 사진 변경</Button>
      </div>
    </MyPageHeaderBlock>
  );
};

export default MyPageHeader;
