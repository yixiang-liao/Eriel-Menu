import React from 'react'
import { FaInstagram , FaFacebookF , FaLine } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className='head'>
        <div className='logo'>
          <img src="./logo/Eriel.logo_white.png" alt="Logo" />
        </div>
      </div>

      <div className='content'>
        <p>週四～週一 12:00-20:00</p>
        <p>台塑公園二巷12號</p>
        <p>eriel.gelato@gmail.com</p>
        <p>07-2382899</p>
      </div>

      <div className='copyright'>
        Copyright © {year} Eriel .
      </div>
    </div>
  )
}

export default Footer
