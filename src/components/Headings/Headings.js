import React from 'react';
import './headings.scss';

export const H1 = ({ text, style, className, children }) => (
  <h1 style={style} className={`h1${className ? ` ${className}` : ''}`}>
    {children ? children : text}
  </h1>
);

export const H3 = ({ text, style, className, children }) => (
  <h3 style={style} className={`h3${className ? ` ${className}` : ''}`}>
    {children ? children : text}
  </h3>
);

export const H2 = ({ text, style, className, children }) => (
  <h2 style={style} className={`h6${className ? ` ${className}` : ''}`}>
    {children ? children : text}
  </h2>
);
