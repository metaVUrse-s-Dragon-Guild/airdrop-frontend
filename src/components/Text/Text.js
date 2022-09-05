import React from 'react';
import './text.scss';

const textSize = {
  small: 'small-text', 
  big: 'big-text'
}

const Text = ({ style, size = 'big', text, className, onClick, children }) => {
  return (
    <p
      className={`${textSize[size]}${className ? ` ${className}` : ''}`}
      style={style}
      onClick={onClick}
    >
      {children ? children : text}
    </p>
  );
};

export default Text;
