import React from 'react'

const Button = ({title,type,onClick}) => {
  return (
    <button className='primarybutton' type={type} onClick={onClick}>
        {title}
    </button>
  )
}

export default Button