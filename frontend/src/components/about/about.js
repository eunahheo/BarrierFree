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
const A = styled.div`
  #about {
    background: #f6f6f6;
    padding: 100px 0;
  }

  #about h3 {
    font-size: 22px;
    margin: 0 0 20px;
  }
  #about h2 {
    position: relative;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
  #about p {
    line-height: 24px;
    margin: 30px 0;
  }
  * {
    box-sizing: border-box;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .grid {
    gap: 1.5rem;
    justify-content: center;
    display: flex;
  }
  .aspect-box {
    aspect-ratio: 3 / 2;
    padding: 1.5rem;
    border-radius: 1.5rem;
    box-shadow: 0.1rem 0.1rem 0.5rem rgb(0 0 0 / 0.05),
      0.15rem 0.15rem 0.75rem rgb(0 0 0 / 0.1);
    align-items: center;
    float: left;
    background-color: white;
    width: 200px;
    height: 120px;
  }
  a {
    font-size: 140%;
    font-weight: bold;
    top: 15px;
  }
  a:link {
    color: #2d4059;
    text-decoration: none;
  }
  a:visited {
    color: #2d4059;
    text-decoration: none;
  }
  a:hover {
    color: #ea5455;
    text-decoration: underline;
  }
  a:active {
    color: #ea5455;
    text-decoration: none;
  }
`;
export const About = () => {
  return (
    <A>
      <div data-aos="fade-up" d="about">
        <div className="about-text">
          <h2>여행 도움 사이트</h2>
          <div className="grid">
            <div class="aspect-box">
              <br></br>
              <a href="http://www.wheelshare.kr/" target="_blank">
                휠쉐어
              </a>
            </div>
            <div class="aspect-box">
              <br></br>
              <a href="https://wis.seoul.go.kr/" target="_blank">
                서울 복지포털
              </a>
            </div>
            <div class="aspect-box">
              <br></br>
              <a href="http://www.seouldanurim.net/intro" target="_blank">
                서울 다누림
              </a>
            </div>
            <div class="aspect-box">
              <br></br>
              <a href="http://greentrip.kr/" target="_blank">
                초록여행
              </a>
            </div>
            <div class="aspect-box">
              <br></br>
              <a
                href="https://www.sisul.or.kr/open_content/calltaxi/introduce/bus.jsp"
                target="_blank"
              >
                장애인버스
              </a>
            </div>
          </div>
        </div>
      </div>
    </A>
  );
};
