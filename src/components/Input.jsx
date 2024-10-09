import React from 'react'

const Input = ({type, placeholder, name, value, onChange}) => {
  return (
    <input type={type} name={name} value={value} onChange={onChange} className='w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none' placeholder={placeholder} required />
  )
}

export default Input