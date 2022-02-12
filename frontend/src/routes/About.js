import React from 'react';
import ScrollPlayground from '../components/write/Scroll';
import Uploader from './Uploader';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PlaceDialog from '../components/write/PlaceDialog';
function About() {
  const [searchPlaces, setSearchPlaces] = useState([]);
  useEffect(() => {
    const response = axios({
      method: 'get',
      url: '/post/searchLocation',
      params: { postLocation: '서울' },
    });
    console.log(response.data);
    setSearchPlaces(response.data);
  }, []);
  return (
    <div>
      <Uploader></Uploader>
      <PlaceDialog></PlaceDialog>
      <ScrollPlayground searchPlaces={searchPlaces}></ScrollPlayground>
      <h1>Third test</h1>
      <h4>/images/20220212_90aadf91-4f73-4957-b42a-ca6ca9999e67_test222.png</h4>
      <img src="/images/20220212_90aadf91-4f73-4957-b42a-ca6ca9999e67_test222.png"></img>
      <h4>
        /images/20220212_1bd6e013-5c36-4992-9b9b-1dd878cbf5f9_barrierfreelogo.png
      </h4>
      <img src="/images/20220212_1bd6e013-5c36-4992-9b9b-1dd878cbf5f9_barrierfreelogo.png"></img>
      <span>About weclusive</span>
      <h1>second test</h1>
      <h4>/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png</h4>
      <img src="/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png"></img>
      <h4>/app/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png</h4>
      <img src="/app/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png"></img>
      <h4>/images/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png</h4>
      <img src="/images/20220211_cb015e45-1646-4c7b-9e1a-4abdcd97d3db_alin.png"></img>
      <br></br>
      <span>About weclusive</span>;
      <h4>/app/2022/02/09/896bda0b-b73a-4b38-8ee2-397e44301f78_1help.jpg</h4>
      <img src="/app/2022/02/09/896bda0b-b73a-4b38-8ee2-397e44301f78_1help.jpg"></img>
      <h4>/app/build/logo192.png</h4>
      <img src="/app/build/logo192.png"></img>
      <h4>/build/logo192.png</h4>
      <img src="/build/logo192.png"></img>
      <h4>/logo192.png</h4>
      <img src="/logo192.png"></img>
      <h4>/static/media/barrierfreelogo.32148029a2f50fe67a4a.png</h4>
      <img src="/static/media/barrierfreelogo.32148029a2f50fe67a4a.png"></img>
      <h4>/barrierfreelogo.32148029a2f50fe67a4a.png</h4>
      <img src="/barrierfreelogo.32148029a2f50fe67a4a.png"></img>
      <h4>/home/ubuntu/images/picture.png</h4>
      <img src="/home/ubuntu/images/picture.png"></img>
    </div>
  );
}

export default About;
