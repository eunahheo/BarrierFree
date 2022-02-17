import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import WithScrollbar from './WithScrollbar.js';
import Section from './Section.js';
import styled from 'styled-components';

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
