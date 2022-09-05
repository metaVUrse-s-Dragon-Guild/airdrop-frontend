import React, { useRef } from 'react';
import LazyLoad from 'react-lazyload';

const LazyImage = ({ src, alt, className, onClick, style }) => {
  const refPlaceholder = useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <div className='image-wrapper' onClick={onClick} style={style}>
      <div className='image-placeholder' ref={refPlaceholder} />
      <LazyLoad>
        <img
          className={`${className ? `${className} ` : ''}image`}
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </div>
  );
};

export default LazyImage;
