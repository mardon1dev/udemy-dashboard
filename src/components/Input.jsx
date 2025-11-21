// import React from "react";

// const Input = ({ type, placeholder, name, value, onChange, extraStyle }) => {
//   return (
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none focus:border-[#509CDB] ${extraStyle}`}
//       placeholder={placeholder}
//       required
//     />
//   );
// };

// export default Input;

import React, { Component } from "react";

class Input extends Component {
  render() {
    const { type, placeholder, name, value, onChange, extraStyle } = this.props;

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none focus:border-[#509CDB] ${extraStyle}`}
        placeholder={placeholder}
        required
      />
    );
  }
}

export default Input;
