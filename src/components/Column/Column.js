import React from 'react';
import './column.scss';

const Column = ({ onClick, style, className, children, center, spaceBetween }) => {
  return (
    <div
      onClick={onClick}
      className={`column${className ? ` ${className}` : ''}`}
      style={{ ...(center && { justifyContent: 'center', alignItems: 'center'}), ...(spaceBetween && { justifyContent: 'space-between'}), ...style}}
    >
      {children}
    </div>
  );
};

export default Column;
