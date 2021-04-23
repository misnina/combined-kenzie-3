import React from 'react'

import '../styles/Avatar.scss';

export default function Avatar({name, photoURL, size}) {
  const style = {
    height: size ? `${size}px` : '60px',
    width: size ? `${size}px` : '60px',
    backgroundImage: `url(${photoURL})`,
  }

  return (
    <div className='avatar' alt={`${name}'s Avatar`} style={style}/>
  )
}
