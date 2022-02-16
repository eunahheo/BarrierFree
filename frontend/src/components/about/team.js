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
      <div data-aos="fade-up" id="services" className="text-center">
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
