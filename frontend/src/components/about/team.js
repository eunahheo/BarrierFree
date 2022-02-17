import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
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
      <div data-aos="fade-up" id="services" className="text-center">
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
                  사진을 클릭하면 사진에 대한 정보를 읽어줍니다. <br></br>내
                  위치 주변 여행지를 추천해줍니다.
                  <br></br>유니버설디자인 서체를 적용하여 고령층과 저시력인까지
                  읽기 편안한 서비스를 제공합니다.
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
