import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

export function Input({
  placeholder,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="form-group">
      {/* {label && <label htmlFor="{props.id">{label}</label>} */}
      <input
        className={`input ${className}`}
        {...props}
        type="text"
        placeholder={placeholder}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
