import Physical from '../images/PhysicalCheck.png';
import PhysicalHide from '../images/Physical60.png';
import Auditory from '../images/AuditoryCheck.png';
import AuditoryHide from '../images/Auditory60.png';
import Pregnant from '../images/PregnantCheck.png';
import PregnantHide from '../images/Pregnant60.png';
import Senior from '../images/SeniorCheck.png';
import SeniorHide from '../images/Senior60.png';
import Visual from '../images/VisualCheck.png';
import VisualHide from '../images/Visual60.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1rem 0.5rem 0;
    cursor: pointer;
    width: 33;
  }
  img.active {
    border: 2px solid red;
    width: 33;
  }
`;

const WriteBarrierIcon = ({
  onChangeField,
  onClickField,
  deaf,
  infant,
  physical,
  senior,
  visibility,
  impairment,
}) => {
  const [barrierIcon, setBarrierIcon] = useState({
    physicalFlag: false,
    visibilityFlag: false,
    deafFlag: false,
    infantFlag: false,
    seniorFlag: false,
  });
  const { physicalFlag, visibilityFlag, deafFlag, infantFlag, seniorFlag } =
    barrierIcon;

  const onClickPhysical = (e) => {
    if (physical) {
      onClickField({ key: 'physical', value: 0 });
      setBarrierIcon({ ...barrierIcon, physicalFlag: false });
    } else {
      onClickField({ key: 'physical', value: 1 });
      setBarrierIcon({ ...barrierIcon, physicalFlag: true });
    }
  };
  const onClickVisibility = (e) => {
    if (visibility) {
      onClickField({ key: 'visibility', value: 0 });
      setBarrierIcon({ ...barrierIcon, visibilityFlag: false });
    } else {
      onClickField({ key: 'visibility', value: 1 });
      setBarrierIcon({ ...barrierIcon, visibilityFlag: true });
    }
  };
  const onClickDeaf = (e) => {
    if (deaf) {
      onClickField({ key: 'deaf', value: 0 });
      setBarrierIcon({ ...barrierIcon, deafFlag: false });
    } else {
      onClickField({ key: 'deaf', value: 1 });
      setBarrierIcon({ ...barrierIcon, deafFlag: true });
    }
  };
  const onClickInfant = (e) => {
    if (infant) {
      onClickField({ key: 'infant', value: 0 });
      setBarrierIcon({ ...barrierIcon, infantFlag: false });
    } else {
      onClickField({ key: 'infant', value: 1 });
      setBarrierIcon({ ...barrierIcon, infantFlag: true });
    }
  };
  const onClickSenior = (e) => {
    if (senior) {
      onClickField({ key: 'senior', value: 0 });
      setBarrierIcon({ ...barrierIcon, seniorFlag: false });
    } else {
      onClickField({ key: 'senior', value: 1 });
      setBarrierIcon({ ...barrierIcon, seniorFlag: true });
    }
  };

  useEffect(() => {
    if (impairment) {
      impairment.forEach((type) => {
        if (type === 'physical') {
          console.log(type);
          setBarrierIcon({ ...barrierIcon, physicalFlag: true });
          onClickField({ key: 'physical', value: 1 });
        } else if (type === 'visibility') {
          console.log(type);
          setBarrierIcon({ ...barrierIcon, visibilityFlag: true });
          onClickField({ key: 'visibility', value: 1 });
        } else if (type === 'deaf') {
          console.log(type);
          setBarrierIcon({ ...barrierIcon, deafFlag: true });
          onClickField({ key: 'deaf', value: 1 });
        } else if (type === 'infant') {
          console.log(type);
          setBarrierIcon({ ...barrierIcon, infantFlag: true });
          onClickField({ key: 'infant', value: 1 });
        } else if (type === 'senior') {
          console.log(type);
          setBarrierIcon({ ...barrierIcon, seniorFlag: true });
          onClickField({ key: 'senior', value: 1 });
        }
        console.log('type', type);
      });
    }
  }, []);
  console.log(barrierIcon);
  return (
    <AuthBarrierIconBlock>
      <div align="center" className="barriericon">
        <span style={{ fontWeight: 'bold', color: '#2D4059' }}>불편사항</span>

        <img
          name="physical"
          src={physical ? Physical : PhysicalHide}
          width="35"
          onClick={onClickPhysical}
        ></img>
        <img
          name="visibility"
          src={visibility ? Visual : VisualHide}
          width="35"
          onClick={onClickVisibility}
        ></img>
        <img
          name="deaf"
          src={deaf ? Auditory : AuditoryHide}
          width="35"
          onClick={onClickDeaf}
        ></img>
        <img
          name="infant"
          src={infant ? Pregnant : PregnantHide}
          width="35"
          onClick={onClickInfant}
        ></img>
        <img
          name="senior"
          src={senior ? Senior : SeniorHide}
          width="35"
          onClick={onClickSenior}
        ></img>
      </div>
    </AuthBarrierIconBlock>
  );
};

export default WriteBarrierIcon;
