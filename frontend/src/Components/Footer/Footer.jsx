import React from 'react'
import './Footer.css'
import Wave from '../img/wave.png'

const Footer = () => {
  return (
    <div className="footer">
        <img src={Wave} alt="" style={{width:'100%', height:'25vh'}}/>
        <div className="f-content">
            <span className='mt-2' style={{}}>kevinekeen96@gmail.com</span>
            <span style={{}}>delphinoclaude@gmail.com</span>
            <div className="f-icons">
               
            </div>
        </div>
    </div>
  )
}

export default Footer;
