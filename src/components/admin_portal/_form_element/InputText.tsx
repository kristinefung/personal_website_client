import React from 'react';
import { getRandomString } from 'src/utils/common';

// Define the props interface
interface InputTextProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string; // Optional prop
  isDisabled?: boolean; // Optional prop with default value
  flex?: number;
}
const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  errorMsg,
  isDisabled = false,
  flex = 1,
}) => {
  const id = 'text-' + getRandomString(10);

  return (
    <div className='form-element input-text flex flex-1 flex-col'>
      <div className='row'>
        <label className='py-1 text-[#a2a2a5]' htmlFor={id}>{label}</label>
        {errorMsg && <div className='error-msg'>{errorMsg}</div>}
      </div>
      <input
        id={id}
        className='border border-[#4a4a54] bg-[#37373f] rounded-lg p-2.5 text-white'
        type="text"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}

export default InputText;