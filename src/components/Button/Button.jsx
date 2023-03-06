import React, { forwardRef } from 'react';
import s from './Button.module.css';

const Button = ({ onClick, children, color, ...restProps }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={s.button}
      style={{
        borderRadius: 4,
        backgroundColor: color,
        padding: '8px 16px',
        border: 'none',
      }}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
