import React from "react";
import Physical from "../images/Physical.png";
import PhysicalHide from "../images/PhysicalHide.png";
import Auditory from "../images/Auditory.png";
import AuditoryHide from "../images/AuditoryHide.png";
import Pregnant from "../images/Pregnant.png";
import PregnantHide from "../images/PregnantHide.png";
import Senior from "../images/Senior.png";
import SeniorHide from "../images/SeniorHide.png";
import Visual from "../images/Visual.png";
import VisualHide from "../images/VisualHide.png";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1.5rem 0.75rem 0;
    cursor: pointer;
  }
`;
function AuthBarrierIcon() {
  return (
    <div>
      <AuthBarrierIconBlock>
        <div align="center">
          <img name="physical" src={Physical} width="30"></img>
          <img name="visual" src={Visual} width="30"></img>
          <img name="auditory" src={Auditory} width="30"></img>
          <img name="pregnant" src={Pregnant} width="30"></img>
          <img name="senior" src={Senior} width="30"></img>
        </div>
      </AuthBarrierIconBlock>
    </div>
  );
}

export default AuthBarrierIcon;
