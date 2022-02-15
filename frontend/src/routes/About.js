import React from 'react';
import ScrollPlayground from '../components/write/Scroll';
import Uploader from './Uploader';
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import PlaceDialog from '../components/write/PlaceDialog';
// import { Image } from './image';

const AboutBox = styled.div`
  width: 100%;
  padding: 20px;
  width: 111%;
`;
function About() {
  const [content, setContent] = useState([]);
  const [feature, setFeature] = useState([]);
  useEffect(() => {
    setContent('우리는 위클루시브, 우리의 프로젝트는 베리어프리');
    setFeature(['한국관광 공사 데이터', '실 사용자의 후기', '편의 시설 정보']);
  }, []);

  const site = [
    {
      title: '공공서비스 예약',
      content: 'https://yeyak.seoul.go.kr/web/main.do',
    },
    {
      title: '대한민국 구석구석',
      content: 'https://korean.visitkorea.or.kr/main/main.do#home',
    },
  ];
  return (
    <div>
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {' '}
              <img
                src="static/media/barrierfreelogo.32148029a2f50fe67a4a.png"
                className="img-responsive"
                alt=""
                width="50%"
              />{' '}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <p>{content ? content : 'loading...'}</p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {feature
                        ? feature.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)
                        : 'loading'}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {}
        <h1>어려워요@.@</h1>
        이거 진짜 엉망진창 코드
      </div>
    </div>
  );
}

export default About;
