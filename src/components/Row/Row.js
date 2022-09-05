import React from 'react';
import './row.scss';

const Row = ({ onClick, style, className, children, center, spaceBetween }) => {
  return (
    <div
      onClick={onClick}
      className={`row${className ? ` ${className}` : ''}`}
      style={{ ...(center && { justifyContent: 'center', alignItems: 'center'}), ...(spaceBetween && { justifyContent: 'space-between'}), ...style}}
    >
      {children}
    </div>
  );
};

export default Row;
