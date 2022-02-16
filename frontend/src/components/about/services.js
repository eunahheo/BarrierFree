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
const SS = styled.div`
  .img-responsive {
    width: 50%;
    margin-top: 5px;
    background: #fff;
    border-right: 0;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.06);
  }
  #services {
    padding: 100px;
    // background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);
    color: #fff;
  }
  .row {
    text-align: left;
  }
  #services .service-desc {
    // margin: 10px 10px 20px;
  }
  #services h2 {
    color: #000;
    font-size: 25px;
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
  #services .service-desc {
    margin-bottom: 40px;
  }
  span {
    color: #ea5455;
    // font-size: 35px;
  }
`;
export const Services = () => {
  return (
    <SS>
      <div data-aos="fade-up" id="services" className="text-center">
        <div className="container">
          <div className>
            <img src="logo192.png" className="img-responsive" alt="" />
          </div>
          <div className="row">
            <div className="service-desc">
              <h2>
                <span>B</span>arrier<span>F</span>ree
              </h2>
              <p>
                여행지의 무장애 정보와 실제 방문객들의 생생한 후기까지 제공하는
                무장애 여행 SNS입니다.
              </p>
              <br></br>
              <br></br>
              <h2>베프란?</h2>
              <p>Barrier Free의 BF, Best Friend의 BF를 의미합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </SS>
  );
};
