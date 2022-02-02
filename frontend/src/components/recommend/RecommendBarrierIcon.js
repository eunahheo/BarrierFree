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

const RecommendBarrierIcon = ({ barriers }) => {
  const barrierList = [
    PhysicalHide,
    VisualHide,
    AuditoryHide,
    PregnantHide,
    SeniorHide,
  ];
  for (let barrier of barriers) {
    if (barrier === "physical") {
      barrierList[0] = Physical;
    } else if (barrier === "visibility") {
      barrierList[1] = Visual;
    } else if (barrier === "deaf") {
      barrierList[2] = Auditory;
    } else if (barrier === "infant") {
      barrierList[3] = Pregnant;
    } else if (barrier === "senior") {
      barrierList[4] = Senior;
    }
  }
  // console.log(barrierList)

  const barrierIconList = barrierList.map((Icon, barrier) => (
    <img src={Icon} alt={barrier} width="30"></img>
  ));

  return <div>{barrierIconList}</div>;
};
export default RecommendBarrierIcon;
