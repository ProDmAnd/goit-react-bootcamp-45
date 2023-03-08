import React, { forwardRef } from 'react';

const Button = (
  {
    selected,
    onClick,
    children,
    color,
    selectedColor = '#30ADF2',
    ...restProps
  },
  ref
) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        borderRadius: 4,
        backgroundColor: selected ? selectedColor : color,
        color: selected ? 'white' : 'black',
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
