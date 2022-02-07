import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import bflogo from '../images/barrierfreelogo.png';

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: start;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rbga(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 10px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">HOME</Link>
        </div>
        {/* <img src={bflogo} width="200" style={{ marginTop: "2rem" }}></img> */}
        {children}
        {/* <img src={bflogo} width="200" style={{ marginTop: "2rem" }}></img> */}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
