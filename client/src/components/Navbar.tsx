import React from 'react'
import Logo from '../images/Logo.png';
import '../scss/nav.scss'
import Scroll from '../utils/scroll';
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={Logo} alt="" />
      <div className="left">
          <button onClick={(e)=> Scroll("inst")}>Guide</button>
          <button onClick={(e)=> Scroll("deepfake")}>Detect Videos</button>
          <button onClick={(e)=> Scroll("games")}>Games</button>
          <button>Creators</button>
      </div>
    </div>
  )
}

export default Navbar