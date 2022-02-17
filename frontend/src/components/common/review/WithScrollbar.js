import React from 'react';
import Carousel from 'react-multi-carousel';
import './WithScrollbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class WithScrollbar extends React.Component {
  state = {
    additionalTransfrom: 0,
    myWeeklyList: this.props.myWeeklyList,
    link: null,
  };
  loadList = async () => {
    axios({
      url: '/main/weekscrap',
      method: 'get',
      params: { userSeq: 0, page: 1, size: 20 },
    }).then((res) => {
      this.setState({ myWeeklyList: res.data });
    });
  };

  render() {
    // console.log(this.props);
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            150,
        );
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={(e) => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value == 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide,
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };

    return (
      <Carousel
        ssr={false}
        ref={(el) => (this.Carousel = el)}
        partialVisbile={false}
        customButtonGroup={<CustomSlider />}
        itemClass="slider-image-item"
        responsive={responsive}
        autoPlay={this.props.deviceType !== 'mobile' ? true : false}
        autoPlaySpeed={2000}
        infinite={true}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={(nextSlide) => {
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >
        {this.props.myWeeklyList &&
          this.props.myWeeklyList.map((post) => {
            return (
              <Card sx={{ width: 320 }}>
                <CardActionArea>
                  {this.props.myuser.myuser !== null ? (
                    <Link to={{ pathname: `post/detail/${post.postSeq}` }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={post.postPhoto}
                        alt={post.postTitle}
                      />
                    </Link>
                  ) : (
                    <Link to={{ pathname: `/loginpage` }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={post.postPhoto}
                        alt={post.postTitle}
                      />
                    </Link>
                  )}

                  <CardContent align="left">
                    <Typography variant="body2" color="text.secondary">
                      <LocationIcon sx={{ fontSize: 15 }} /> {post.postLocation}
                    </Typography>
                    <Typography variant="body1">{post.postTitle}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </Carousel>
    );
  }
}

export default WithScrollbar;
