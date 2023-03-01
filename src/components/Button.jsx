import React from 'react';

export default function Button({ onClick, title, ...restProps }) {

  return (
    <button onClick={onClick} {...restProps}>
      {title}
    </button>
  );
}
