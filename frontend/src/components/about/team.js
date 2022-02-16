import styled from 'styled-components';

const T = styled.div`
  .img-responsive {
    width: 50%;
    margin-top: 5px;
    background: #fff;
    border-right: 0;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.06);
  }
  #services {
    padding: 20px 100px;
    position: relative;
  }
  .row {
    display: flex;
    text-align: left;
  }
  #services .section-title h2::after {
    position: absolute;
    content: '';
    background: rgba(255, 255, 255, 0.3);
    height: 4px;
    width: 60px;
    bottom: 0;
    margin-left: -30px;
    left: 50%;
  }
  #services i.fa {
    font-size: 42px;
    width: 120px;
    height: 120px;
    padding: 40px 0;
    background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);
    border-radius: 50%;
    color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  }

  #services p {
    color: black;
    font-size: 20px;
  }
  span {
    color: #ea5455;
  }

  .left {
    flex: 5;
  }
  .right {
    flex: 5;
    display: flex;
  }
  .content {
    font-size: 20px;
    line-height: 40px;
  }
  .p {
    padding-top: 30px;
  }
  #row2 {
    align-items: center;
    align-content: center;
    justify-content: center;
  }
`;
export const Team = () => {
  return (
    <T>
      <div id="services" className="text-center">
        <img
          src="weclusive.png"
          width="50%"
          style={{ paddingTop: '50px' }}
        ></img>
        <div className="row" id="row2">
          <div id="services" className="text-center">
            <div className="p">
              <h2 style={{ textAlign: 'left' }}> 우리의 대표 색</h2>
              <div className="row">
                <div className="left">
                  <img src="colors.png" width="500px"></img>
                </div>
                <div
                  className="right"
                  style={{
                    paddingLeft: '50px',
                    paddingRight: '50px',
                  }}
                >
                  <div className="content">
                    색약, 색맹 질환을 가진 색각 이상자분들도<br></br>
                    쉽게 구분할 수 있는 4가지 색을 대표색으로 지정 했고,
                    <br></br> 이 대표색을 이용하여 홈페이지를 구성했습니다.
                  </div>
                </div>
              </div>
            </div>
            <div className="p">
              <h2 style={{ textAlign: 'right', paddingRight: '70px' }}>
                우리의 아이콘
              </h2>
              <div className="row">
                <div
                  className="left"
                  style={{
                    paddingLeft: '50px',
                    paddingRight: '50px',
                  }}
                >
                  <div className="content" style={{ textAlign: 'right' }}>
                    색 뿐만 아니라 빗금을 사용해서 선택 유무를 표현했고,{' '}
                    <br></br>
                    사용자분들이 편리하게 이용할 수 있도록 했습니다.
                  </div>
                </div>
                <div className="right">
                  <img
                    src="icon.png"
                    height="100px"
                    style={{ paddingLeft: '20px' }}
                  ></img>
                </div>
              </div>
            </div>
            <div>
              <div className="p">
                <h2 style={{ textAlign: 'left' }}>기능</h2>
                <div className="content" style={{ textAlign: 'left' }}>
                  사진을 클릭하면 사진에 대한 정보를 읽어줍니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="we.png" width="50%"></img>
      </div>
    </T>
  );
};
