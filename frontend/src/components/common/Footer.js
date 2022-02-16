import styled from 'styled-components';
{
  /* <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>; */
}
const C = styled.div`
  /* Footer Section*/
  #footer {
    background: #e5e5e5;
    padding: 10px 0 20px 0;
    width: 100%;
    // margin-top: 18%;
    // position: relative;
    // transform: translatY(-100%);
  }
  #footer p {
    color: #888;
    font-size: 14px;
  }
  #footer a {
    color: #608dfd;
  }
  #footer a:hover {
    border-bottom: 2px solid #608dfd;
  }
  #con {
    text-align: left;
  }
`;

export const Footer = () => {
  return (
    <C>
      <div id="footer">
        <div className="contact-info">
          <div className="contact-item">
            <div className="con">
              <p>
                <span>📍 </span>
                서울특별시 강남구 역삼동 테헤란로 212
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>✉ </span>
                weclusive@gmail.com
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <p>
          &copy; weclusive. All rights reserved.
          {/* <a href="http://www.templatewire.com" rel="nofollow">
            github
          </a> */}
        </p>
      </div>
    </C>
  );
};

export default Footer;
