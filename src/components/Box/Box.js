import React from 'react';
import './box.scss'

const Box = ({ onClick, backgroundColor, className, children, style, center, row }) => {
  return (
    <div
      onClick={onClick}
      className={`${className ? `${className} ` : ''}box-medium`}
      style={{ backgroundColor, ...(center && { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: row ? 'row' : 'column'}), ...style}}

    >
      {children}
    </div>
  );
};

export default Box;
