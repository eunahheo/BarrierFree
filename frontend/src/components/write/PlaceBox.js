import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCallback, useState, useEffect } from 'react';
import axios from '../../../node_modules/axios/index';
import Button from '../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

const PlaceBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[0]};
  padding-top: 1rem;
`;

const PlaceForm = styled.form`
  // overflow: hidden;
  // display: flex;
  // width: 100%;

  // input,
  // button {
  //   outline: none;
  //   border: none;
  //   font-size: 1.125rem;
  // }

  // button {
  //   // background: ${palette.blue[0]};
  //   color: ${palette.blue[0]};
  //   &:hover {
  //     background: ${palette.gray[0]};
  //     color: ${palette.blue[0]};
  //   }
  // }
`;

const pagnationStyle = {
  color: 'black',
  display: 'flex',
  width: '100%',
  marginTop: '3rem',
  textDecoration: 'none',
  margin: '0 10px',
};

const { kakao } = window;

const PlaceItemBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border-bottom: 1px solid ${palette.gray[0]};
  padding-bottom: 0.5rem;
`;

const PlaceItem = React.memo(({ place, onRemove }) => (
  <div onClick={() => onRemove(place)}>
    <LocationOnIcon />
    {place}
  </div>
));

const PlaceBox = ({ onChangePlace, onChangeField, postLocation }) => {
  const [input, setInput] = useState('');
  const [localPlace, setLocalPlace] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [kakaoMap, setKakaoMap] = useState(false);
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState('');

  const insertPlace = useCallback(
    (postLocation) => {
      if (!postLocation.trim()) return;
      if (localPlace === postLocation) return;
      setLocalPlace(postLocation);
      onChangePlace(postLocation);
    },
    [localPlace, onChangePlace],
  );

  const onRemove = useCallback(() => {
    setLocalPlace([]);
    onChangePlace('');
  }, [localPlace, onChangePlace]);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
    onChangeField({ key: 'postLocation', value: e.target.value });
    setValue(e.target.value);
  }, []);
  const onClickPlace = (searchPlace) => {
    onChangeField({ key: 'postLocation', value: searchPlace.postLocation });
    onChangeField({ key: 'postAddress', value: searchPlace.postAddress });
  };
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertPlace(input.trim());
      setInput('');
      // console.log('?????? ??????::', input);
    },
    [input, insertPlace],
  );
  const onClick = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/post/searchLocation',
        params: { postLocation: postLocation },
      });
      // console.log(response.data);
      setSearchPlaces(response.data);
    } catch (e) {
      // console.log(e.response.data);
    }
  };
  useEffect(() => {
    setLocalPlace(postLocation);
  }, [postLocation]);
  useEffect(() => {
    setLocalPlace([]);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/post/searchLocation',
        params: { postLocation: postLocation },
      });
      setSearchPlaces(response.data);
      setKakaoMap(false);
    } catch (e) {
      // console.log(e.response.data);
      if (e.response.data === 'fail') {
        setKakaoMap(true);
      }
    }
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    onChangeField({ key: 'postLocation', value: '' });
    onChangeField({ key: 'postAddress', value: '' });
    onChangeField({ key: 'contentId', value: 0 });
  };

  const ps = new kakao.maps.services.Places();

  // ????????? ????????? ???????????? ???????????????
  function searchKaKaoPlaces() {
    var keyword = document.getElementById('keyword').value;
    // console.log(keyword);

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('???????????? ??????????????????!');
      return false;
    }

    // ???????????? ????????? ?????? ???????????? ??????????????? ???????????????
    ps.keywordSearch(keyword, placesSearchCB);
  }

  // ??????????????? ???????????? ??? ???????????? ???????????? ?????????
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // ??????????????? ????????? ???????????????
      // ?????? ????????? ??????
      setPlaces(data);
      // console.log('places : ', places);
      displayPagination(pagination);
      return;
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // alert('?????? ????????? ???????????? ????????????.');
      var divEl = document.getElementById('pagination');
      var content = document.createTextNode(
        '?????? ????????? ???????????? ???????????? ?????? ?????? ??????????????????',
      );
      divEl.appendChild(content);
      setValue('');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('?????? ?????? ??? ????????? ??????????????????.');
      return;
    }
  }

  // ????????? ?????? ??????
  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i;

    // ????????? ????????? ?????????????????? ???????????????
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <PlaceBoxBlock>
      <div>
        <PlaceForm onSubmit={onSubmit}>
          <Paper
            // component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <LocationOnIcon sx={{ color: '#2D4059' }} aria-label="menu" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="????????? ???????????????"
              value={postLocation}
              onChange={onChange}
            />
            {/* <IconButton
              onClick={handleClickOpen('paper')}
              sx={{ p: '10px' }}
              aria-label="search"
            >
            </IconButton> */}
            {/* <SearchIcon onClick={handleClickOpen('paper')} /> */}
            <Button onClick={handleClickOpen('paper')}>??????</Button>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </PlaceForm>
        <div>
          {/* <Button onClick={handleClickOpen('paper')}>?????? ?????? ??????</Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">?????? ?????? ??????</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              {kakaoMap ? (
                <div>
                  <h3>??? ?????? ?????????????????? ?????? ?????? ????????? ????????????. </h3>
                  <h3>????????? ????????? ??????????????????????????</h3>
                  <input type="text" id="keyword" />
                  {/* <input type="text" id="keyword" value={value} /> */}
                  <Button onClick={searchKaKaoPlaces}>
                    ????????? ???????????? ????????????
                  </Button>
                  {places.map((place) => (
                    <div
                      onClick={() => {
                        if (place.road_address_name == '') {
                          onChangeField({
                            key: 'postLocation',
                            value: place.place_name,
                          });
                          onChangeField({
                            key: 'postAddress',
                            value: ' ',
                          });
                          onChangeField({
                            key: 'postLat',
                            value: place.y,
                          });
                          onChangeField({
                            key: 'postLng',
                            value: place.x,
                          });
                          onChangeField({
                            key: 'contentId',
                            value: 0,
                          });
                        } else {
                          onChangeField({
                            key: 'postLocation',
                            value: place.place_name,
                          });
                          onChangeField({
                            key: 'postAddress',
                            value: place.road_address_name,
                          });
                          onChangeField({
                            key: 'postLat',
                            value: place.y,
                          });
                          onChangeField({
                            key: 'postLng',
                            value: place.x,
                          });
                          onChangeField({
                            key: 'contentId',
                            value: 0,
                          });
                        }
                        setInput(place.place_name);
                        setOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <h4>{place.place_name}</h4>
                      <h5>{place.road_address_name}</h5>
                      <hr></hr>
                    </div>
                  ))}
                  <div id="pagination"></div>
                </div>
              ) : (
                // DB??? ?????? ??????
                searchPlaces.map((searchPlace) => (
                  <div
                    onClick={() => {
                      onChangeField({
                        key: 'postLocation',
                        value: searchPlace.postLocation,
                      });
                      onChangeField({
                        key: 'postAddress',
                        value: searchPlace.postAddress,
                      });
                      onChangeField({
                        key: 'postLat',
                        value: searchPlace.postLat,
                      });
                      onChangeField({
                        key: 'postLng',
                        value: searchPlace.postLng,
                      });
                      onChangeField({
                        key: 'contentId',
                        value: searchPlace.contentId,
                      });
                      setInput(searchPlace.postLocation);
                      setOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <h4>{searchPlace.postLocation}</h4>
                    <h5>{searchPlace.postAddress}</h5>
                    <hr></hr>
                  </div>
                ))
              )}
            </DialogContent>
            <DialogActions>
              {kakaoMap ? (
                <div>
                  <Button onClick={() => setOpen(false)}>??????</Button>
                  <Button onClick={handleClose}>??????</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => setOpen(false)}>??????</Button>
                  <Button onClick={handleClose}>??????</Button>
                </div>
              )}
            </DialogActions>
          </Dialog>
        </div>
        <br />
      </div>
    </PlaceBoxBlock>
  );
};

export default PlaceBox;
