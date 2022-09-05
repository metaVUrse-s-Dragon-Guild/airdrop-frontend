import React from 'react';
import './input.scss';

const Input = ({
  style,
  type,
  onChange,
  value,
  placeholder,
  className,
  name,
  disabled = false
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
    className={`input${className ? ` ${className}` : ''}`}
    name={name}
    disabled={disabled}
  />
);

export default Input;
