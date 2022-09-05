import React from 'react';
import './button.scss';

const buttonSize = {
  small: "small-button", 
  big: "big-button", 
}

const Button = ({ onClick, size = 'big', style, className, text, children }) => {
  return (
    <div
      onClick={onClick}
      className={`${buttonSize[size]}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children ? children : text}
    </div>
  );
};

export default Button;
