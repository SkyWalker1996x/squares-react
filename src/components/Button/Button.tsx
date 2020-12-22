import React from 'react';
import { ButtonProps } from '../../interfaces';

const Button = ({ label, className, onClick, style }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} style={style}>
      {label}
    </button>
  );
};

export default Button;
