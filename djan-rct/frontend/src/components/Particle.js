import React from 'react'
import cookie from "../images/cookie.png"

const Particle = ({x, y}) => {
    return (
    <img
        src={cookie}
        className='cookie-particle'
        style={{left: x + 'px', top: y + 'px' }}
        alt='particle img'
      />
    );
};

export default Particle;
