import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string | null;
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
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
