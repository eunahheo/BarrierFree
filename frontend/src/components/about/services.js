import styled from 'styled-components';

const SS = styled.div`
  .img-responsive {
    width: 50%;
    margin-top: 5px;
    background: #fff;
    border-right: 0;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.06);
  }
  #services {
    padding: 80px;
    // background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);
    // color: #fff;
  }
  .row {
    text-align: left;
  }
  #services h2 {
    color: #000;
    font-size: 30px;
  }
  #services .service-desc {
    margin-bottom: 40px;
    padding-right: 70px;
  }
  span {
    color: #ea5455;
    // font-size: 35px;
  }
  .pp {
    line-height: 40px;
    color: black;
    font-size: 20px;
  }
`;
export const Services = () => {
  return (
    <SS>
      <div id="services" className="text-center">
        <div className="container">
          <div className>
            <img src="logo192.png" className="img-responsive" alt="" />
          </div>
          <div className="row">
            <div className="service-desc">
              <h2>
                <span>B</span>arrier<span>F</span>ree
              </h2>
              <div className="pp">
                여행지의 무장애 정보와 실제 방문객들의 생생한 후기까지 제공하는
                <br></br> 무장애 여행 SNS입니다.
              </div>
              <br></br>
              <br></br>
              <h2>베프란?</h2>
              <div className="pp">
                Barrier Free의 BF, Best Friend의 BF를 의미합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SS>
  );
};
