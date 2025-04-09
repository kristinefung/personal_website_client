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
  type?: string;
}
const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  errorMsg,
  isDisabled = false,
  flex = 1,
  type = "",
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
        helperText={(errorMsg !== undefined && errorMsg.length !== 0) ? errorMsg : " "}
        onChange={onChange}
        type={type}
        sx={{ flex: flex }}
      />
    </>

  );
}

export default InputText;