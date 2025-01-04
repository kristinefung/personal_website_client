import React from 'react';
import { getRandomString } from 'src/utils/common';

// Define the props interface
interface InputTextProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string; // Optional prop
  isDisabled?: boolean; // Optional prop with default value
}

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  errorMsg,
  isDisabled = false
}) => {
  const id = 'text-' + getRandomString(10);

  return (
    <div className='form-element'>
      <div className='row'>
        <label htmlFor={id}>{label}</label>
        {errorMsg && <div className='error-msg'>{errorMsg}</div>}
      </div>
      <input
        id={id} // Adding id for accessibility
        className={errorMsg ? 'error-field' : ''}
        type="text"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}

export default InputText;