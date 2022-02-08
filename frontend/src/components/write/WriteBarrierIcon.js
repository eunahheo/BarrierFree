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
  onClickField,
  deaf,
  infant,
  physical,
  senior,
  visibility,
}) => {
  const onClickDeaf = (e) => {
    onClickField({ key: 'deaf', value: 1 });
  };
  return (
    <AuthBarrierIconBlock>
      <div align="center" className="barriericon">
        <img
          name="physical"
          src={Physical}
          width="30"
          // onClick={() => {
          //   if (form.physical) {
          //     setForm({ ...form, physical: 0 });
          //   } else {
          //     setForm({ ...form, physical: 1 });
          //   }
          // }}
        ></img>
        <img
          name="visibility"
          src={Visual}
          width="30"
          // onClick={() => {
          //   if (form.visibility) {
          //     setForm({ ...form, visibility: 0 });
          //   } else {
          //     setForm({ ...form, visibility: 1 });
          //   }
          // }}
        ></img>
        <img
          name="deaf"
          src={Auditory}
          width="30"
          onClick={onClickDeaf}
          // onClick={() => {
          //   if (form.deaf) {
          //     setForm({ ...form, deaf: 0 });
          //   } else {
          //     setForm({ ...form, deaf: 1 });
          //   }
          // }}
        ></img>
        <img
          name="infant"
          src={Pregnant}
          width="30"
          // onClick={() => {
          //   if (form.pregnant) {
          //     setForm({ ...form, pregnant: 0 });
          //   } else {
          //     setForm({ ...form, pregnant: 1 });
          //   }
          // }}
        ></img>
        <img
          name="senior"
          src={Senior}
          width="30"
          // onClick={() => {
          //   if (form.senior) {
          //     setForm({ ...form, senior: 0 });
          //   } else {
          //     setForm({ ...form, senior: 1 });
          //   }
          // }}
        ></img>
      </div>
    </AuthBarrierIconBlock>
  );
};

export default WriteBarrierIcon;
