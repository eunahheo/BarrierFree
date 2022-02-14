import Physical from '../images/Physical.png';
import Auditory from '../images/Auditory.png';
import Pregnant from '../images/Pregnant.png';
import Senior from '../images/Senior.png';
import Visual from '../images/Visual.png';
import "./MypageBarriers.css"
import { useState, useEffect } from 'react';

const MypageBarriers = () => {
  const [barrier, setBarrier] = useState([]);

  
  useEffect(() => {
    if (barrier.length > 0) {
      for (let i = 0; barrier.length > i; i++) {
        let current = document.getElementById(barrier[i]);
        current.style.border = '3px solid';
        current.style.borderColor = 'rgb(234, 84, 85)';
        current.style.borderRadius = '100%';
      }
    }
  }, [barrier]);

  const onClickBarrier = (res) => {
    // if (search === true) {
    //   if (barrier.length > 0) {
    //     for (let i = 0; barrier.length > i; i++) {
    //       let current = document.getElementById(barrier[i]);
    //       current.style.border = null;
    //     }
    //   }
    // }
    console.log(res.target.id)
    if (barrier.includes(res.target.id)) {
      let current = document.getElementById(res.target.id);
      current.style.border = null;
      setBarrier(barrier.filter((info) => info !== res.target.id));
    } else {
      setBarrier(barrier.concat(res.target.id));
    }

    console.log(barrier);
  };


  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>불편사항 : </span>
          <img
            class="barrier-icon"
            id="physical"
            onClick={onClickBarrier}
            src={Physical}
            ></img>
          <img
            class="barrier-icon"
            id="visibility"
            onClick={onClickBarrier}
            src={Visual}
            ></img>
          <img
            class="barrier-icon"
            id="deaf"
            onClick={onClickBarrier}
            src={Auditory}
            ></img>
          <img
            class="barrier-icon"
            id="infant"
            onClick={onClickBarrier}
            src={Pregnant}
            ></img>
          <img
            class="barrier-icon"
            id="senior"
            onClick={onClickBarrier}
            src={Senior}
            ></img>
    </div>
  )
}

export default MypageBarriers;