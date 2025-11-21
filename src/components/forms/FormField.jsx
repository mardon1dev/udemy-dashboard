import React from 'react';
import Input from '../Input';

/**
 * Compound Component Pattern
 * Reusable form field component
 */
const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  options = null, // For select fields
  ...props 
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none focus:border-[#509CDB] ${
            error ? 'border-red-500' : ''
          }`}
          required={required}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none focus:border-[#509CDB] ${
            error ? 'border-red-500' : ''
          }`}
          required={required}
          {...props}
        />
      ) : (
        <Input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          extraStyle={error ? 'border-red-500' : ''}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;

