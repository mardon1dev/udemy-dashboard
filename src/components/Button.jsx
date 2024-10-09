import React from 'react'

const Button = ({onClick, title, type, addStyle}) => {
  return (
    <button onClick={onClick} className={`rounded py-3 px-4 bg-[#509CDB] text-white font-semibold text-[14px] ${addStyle}`} type={type}>
        {title}
    </button>
  )
}

export default Button