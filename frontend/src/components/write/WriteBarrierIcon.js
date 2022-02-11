import Physical from '../images/Physical.png';
import PhysicalHide from '../images/PhysicalHide.png';
import Auditory from '../images/Auditory.png';
import AuditoryHide from '../images/AuditoryHide.png';
import Pregnant from '../images/Pregnant.png';
import PregnantHide from '../images/PregnantHide.png';
import Senior from '../images/Senior.png';
import SeniorHide from '../images/SeniorHide.png';
import Visual from '../images/Visual.png';
import VisualHide from '../images/VisualHide.png';
import styled from 'styled-components';

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1.5rem 0.75rem 0;
    cursor: pointer;
  }
  img.active {
    border: 2px solid red;
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
  const onClickPhysical = (e) => {
    if (physical) {
      onClickField({ key: 'physical', value: 0 });
    } else {
      onClickField({ key: 'physical', value: 1 });
    }
  };
  const onClickVisibility = (e) => {
    if (visibility) {
      onClickField({ key: 'visibility', value: 0 });
    } else {
      onClickField({ key: 'visibility', value: 1 });
    }
  };
  const onClickDeaf = (e) => {
    if (deaf) {
      onClickField({ key: 'deaf', value: 0 });
    } else {
      onClickField({ key: 'deaf', value: 1 });
    }
  };
  const onClickInfant = (e) => {
    if (infant) {
      onClickField({ key: 'infant', value: 0 });
    } else {
      onClickField({ key: 'infant', value: 1 });
    }
  };
  const onClickSenior = (e) => {
    if (senior) {
      onClickField({ key: 'senior', value: 0 });
    } else {
      onClickField({ key: 'senior', value: 1 });
    }
  };

  return (
    <AuthBarrierIconBlock>
      <div align="center" className="barriericon">
        <img
          name="physical"
          src={Physical}
          width="30"
          onClick={onClickPhysical}
        ></img>
        <img
          name="visibility"
          src={Visual}
          width="30"
          onClick={onClickVisibility}
        ></img>
        <img name="deaf" src={Auditory} width="30" onClick={onClickDeaf}></img>
        <img
          name="infant"
          src={Pregnant}
          width="30"
          onClick={onClickInfant}
        ></img>
        <img
          name="senior"
          src={Senior}
          width="30"
          onClick={onClickSenior}
        ></img>
      </div>
    </AuthBarrierIconBlock>
  );
};

export default WriteBarrierIcon;
