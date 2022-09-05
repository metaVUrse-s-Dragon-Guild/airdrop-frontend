// import { Column, Input, Row } from 'components';
import React from 'react';
// import upButton from '../assets/stakingModal/up-button.png';
// import downButton from '../assets/stakingModal/down-button.png';
import './clickableforminput.scss';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Row from '../Row/Row';
import Column from '../Column/Column';

const ClickableFormInput = ({
  style,
  type,
  onChange,
  value,
  placeholder,
  name,
  className,
  upButtonFunction,
  downButtonFunction,
  min,
  max,
  text,
  disabled
}) => {
  return (
    <Row className='clickable-input'>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        style={style}
        placeholder={placeholder}
        className={`input${className ? ` ${className}` : ''}`}
        name={name}
        min={min}
        max={max}
        disabled={disabled}
      />

      <Column className='clickable-input__arrow-buttons'>
        {/* <div
          className='clickable-input__up-down-button'
          onClick={upButtonFunction}
        >
          <img
            src={upButton}
            alt='Up button'
            className='clickable-input__up-down-button__image'
          />
        </div>
        <div
          className='clickable-input__up-down-button'
          onClick={downButtonFunction}
        >
          <img
            src={downButton}
            alt='Down button'
            className='clickable-input__up-down-button__image'
          />
        </div> */}
        <Text text={text} />
      </Column>
    </Row>
  );
};

export default ClickableFormInput;
