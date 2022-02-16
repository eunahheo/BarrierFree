import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import WithScrollbar from './WithScrollbar.js';
import Section from './Section.js';

function SwipeableTextMobileStepper({ myWeeklyList }) {
  return (
    <Box sx={{ maxWidth: 1300, flexGrow: 1, overflow: 'hidden' }}>
      <Fragment sx={{ maxWidth: 1300, flexGrow: 1 }}>
        <Section>
          <WithScrollbar props={myWeeklyList} />
        </Section>
      </Fragment>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
