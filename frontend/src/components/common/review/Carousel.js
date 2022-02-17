import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import WithScrollbar from './WithScrollbar.js';
import Section from './Section.js';
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

const B = styled.div`
  // display: grid;
  // gap: 1ch;
  .textShadow {
    text-shadow: 0.1em 0.1em 0 #e5e5e5;
  }
  // .center {
  //   // position: absolute;
  //   // left: 50%;
  //   // margin: 0 auto;
  // }
  h1 {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    color: #2d4059;

    // place-content: center;
  }
`;

function SwipeableTextMobileStepper({ myWeeklyList, myuser }) {
  return (
    <B>
      <Box sx={{ maxWidth: 1300, flexGrow: 1, overflow: 'hidden' }}>
        <Fragment sx={{ maxWidth: 1300, flexGrow: 1 }}>
          <div className="center">
            <h1 className="textShadow">이번주 인기글</h1>
          </div>
          {/* <div className="title">
            <div class="waviy">
              <span style="--i:1">이</span>
              <span style="--i:2">번</span>
              <span style="--i:3">주</span>
              <span style="--i:4"> </span>
              <span style="--i:5">인</span>
              <span style="--i:6">기</span>
              <span style="--i:7">글</span>
            </div>
          </div> */}
          <Section>
            <WithScrollbar myWeeklyList={myWeeklyList} myuser={{ myuser }} />
          </Section>
        </Fragment>
      </Box>
    </B>
  );
}

export default SwipeableTextMobileStepper;
