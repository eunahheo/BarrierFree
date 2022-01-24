import React from "react";
import Physical from "../images/Physical.png"
import PhysicalHide from "../images/PhysicalHide.png"
import Auditory from "../images/Auditory.png"
import AuditoryHide from "../images/AuditoryHide.png"
import Pregnant from "../images/Pregnant.png"
import PregnantHide from "../images/PregnantHide.png"
import Senior from "../images/Senior.png"
import SeniorHide from "../images/SeniorHide.png"
import Visual from "../images/Visual.png"
import VisualHide from "../images/VisualHide.png"

function BarrierIcon() {
  return (
    <div>
      <div align="center">
        {/* if문 사용하기 */}
        <img src={Physical} width="30"></img>
        {/* <img src={PhysicalHide} width="30"></img> */}
        {/* if문 사용하기 */}
        <img src={Visual} width="30"></img>
        {/* <img src={VisualHide} width="30"></img> */}
        {/* if문 사용하기 */}
        {/* <img src={Auditory} width="30"></img> */}
        <img src={AuditoryHide} width="30"></img>
        {/* if문 사용하기 */}
        <img src={Senior} width="30"></img>
        {/* <img src={SeniorHide} width="30"></img> */}
        {/* if문 사용하기 */}
        {/* <img src={Pregnant} width="30"></img> */}
        <img src={PregnantHide} width="30"></img>
      </div>
    </div>
  )
}

export default BarrierIcon;