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
    padding: 100px;
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
  #services h3 {
    font-weight: 500;
    padding: 5px 0;
    color: #000;
  }
  #services p {
    color: black;
    font-size: 20px;
  }
  span {
    color: #ea5455;
    // font-size: 35px;
  }

  .left {
    flex: 5;
  }
  // .center {
  //   flex: 3;
  // }
  .right {
    flex: 4;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;
export const Team = () => {
  return (
    <T>
      <div id="services" className="text-center">
        <div className="row">
          <div className="left">
            <img src="Weclusive.png" width="90%"></img>
          </div>
          {/* <div className="center">
            <h1>Weclusive</h1>
            <p>= We + Inclusive</p>
            <br></br>
            <p>우리라는 We와 모든 것을 포함하는 Inclusive의 합성어</p>
            <br></br>
            <h1>mission</h1>
            <p> 사회적 약자들도 수용하는 세상을 만들어가자</p>
          </div> */}
          <div className="right">
            <img src="we.png" width="100%"></img>
          </div>
        </div>
      </div>
    </T>
  );
};
