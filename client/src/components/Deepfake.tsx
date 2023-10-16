import React from 'react'
import Polygon from '../images/Polygon 1.png';
import Rope from '../images/rope.png';
import "../scss/deepfake.scss"
const Deepfake = () => {
  return (
    <div className="deepfake">
      <div className="left"></div>
      <div className="right">
        <div className="box">
          <button>Drop Your Video</button>
          <p>Upto 20-30 mb of video only !</p>
        </div>
      </div>
      <img src={Polygon} alt="v" className='ploy' />
      <img src={Rope} alt="rve" className='rope' />
    </div>
  )
}

export default Deepfake