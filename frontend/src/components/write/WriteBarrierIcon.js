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
import { useState } from 'react';

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

  return (
    <AuthBarrierIconBlock>
      <div align="center" className="barriericon">
        <span style={{ fontWeight: 'bold', color: '#2D4059' }}>불편사항</span>

        <img
          name="physical"
          src={physicalFlag ? Physical : PhysicalHide}
          width="35"
          onClick={onClickPhysical}
        ></img>
        <img
          name="visibility"
          src={visibilityFlag ? Visual : VisualHide}
          width="35"
          onClick={onClickVisibility}
        ></img>
        <img
          name="deaf"
          src={deafFlag ? Auditory : AuditoryHide}
          width="35"
          onClick={onClickDeaf}
        ></img>
        <img
          name="infant"
          src={infantFlag ? Pregnant : PregnantHide}
          width="35"
          onClick={onClickInfant}
        ></img>
        <img
          name="senior"
          src={seniorFlag ? Senior : SeniorHide}
          width="35"
          onClick={onClickSenior}
        ></img>
      </div>
    </AuthBarrierIconBlock>
  );
};

export default WriteBarrierIcon;
