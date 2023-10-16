import React from 'react'
import Logo from '../images/Logo.png';
import '../scss/nav.scss'
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={Logo} alt="" />
      <div className="left">
          <button>Guide</button>
          <button>Detect Videos</button>
          <button>Games</button>
          <button>Creators</button>
      </div>
    </div>
  )
}

export default Navbar