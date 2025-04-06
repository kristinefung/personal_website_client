import React from 'react';
import { getRandomString } from 'src/utils/common';
import TextField from '@mui/material/TextField';

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
    <>
      <TextField
        id={id}
        label={label}
        defaultValue={value}
        disabled={isDisabled}
        error={(errorMsg !== undefined && errorMsg.length !== 0)}
        helperText={errorMsg}
        sx={{ flex: flex }}
      />
    </>

  );
}

export default InputText;