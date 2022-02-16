import React, { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
// import 'semantic-ui-css/semantic.min.css';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
// import UAParser from 'ua-parser-js';
import Simple from './Simple.js';
import WithScrollbar from './WithScrollbar.js';
import Section from './Section.js';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({ myWeeklyList }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [images, setImages] = useState([
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927',
    },
    {
      label: 'Bird',
      imgPath: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927',
    },
    {
      label: 'Bali, Indonesia',
      imgPath: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927',
    },
    {
      label: 'Goč, Serbia',
      imgPath: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927',
    },
  ]);

  const maxSteps = images.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  useEffect(() => {
    // console.log('여기', myWeeklyList);
    if (myWeeklyList) {
      setImages([
        {
          label: 'San Francisco – Oakland Bay Bridge, United States',
          imgPath: 'https://i6a504.p.ssafy.io/' + myWeeklyList[0].postPhoto,
        },
        {
          label: 'Bird',
          imgPath: 'https://i6a504.p.ssafy.io/' + myWeeklyList[1].postPhoto,
        },
        {
          label: 'Bali, Indonesia',
          imgPath: 'https://i6a504.p.ssafy.io/' + myWeeklyList[2].postPhoto,
        },
        {
          label: 'Goč, Serbia',
          imgPath: 'https://i6a504.p.ssafy.io/' + myWeeklyList[3].postPhoto,
        },
      ]);
    }
  }, []);
  return (
    <Box sx={{ maxWidth: 1000, flexGrow: 1 }}>
      <Fragment sx={{ maxWidth: 1000, flexGrow: 1 }}>
        <Section>
          <WithScrollbar props={myWeeklyList} />
        </Section>
      </Fragment>
      {/* <h1>{myWeeklyList[0].postPhoto}</h1>
      <h1>{myWeeklyList[1].postPhoto}</h1>
      <h1>{myWeeklyList[2].postPhoto}</h1>
      <h1>{myWeeklyList[3].postPhoto}</h1> */}
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      /> */}
    </Box>
  );
}

export default SwipeableTextMobileStepper;
