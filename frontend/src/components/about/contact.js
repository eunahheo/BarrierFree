import styled from 'styled-components';
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>;
const C = styled.div`
  #contact {
    background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);
    color: rgba(255, 255, 255, 0.75);
  }
  #contact .section-title {
    margin-bottom: 40px;
  }
  #contact-us {
    color: black;
    font-size: 20px;
  }
  #contact .section-title p {
    font-size: 16px;
  }
  #contact h2 {
    color: #fff;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
  #contact .section-title h2::after {
    position: absolute;
    content: '';
    background: rgba(255, 255, 255, 0.3);
    height: 4px;
    width: 60px;
    bottom: 0;
    left: 30px;
  }
  #contact h3 {
    color: #fff;
    // // margin-top: 80px;
    // margin-bottom: 25px;
    // padding-bottom: 20px;
    font-weight: 400;
  }
  #contact-info {
    margin-left: 40px;
  }

  /* Footer Section*/
  #footer {
    background: white;
    padding: 30px 0 30px 0;
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

export const Contact = () => {
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
                weclusvie@gmail.com
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <p>
          &copy; weclusvie. All rights reserved.
          {/* <a href="http://www.templatewire.com" rel="nofollow">
            github
          </a> */}
        </p>
      </div>
    </C>
  );
};
