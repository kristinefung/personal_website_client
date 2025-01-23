import React from 'react';
import { getRandomString } from 'src/utils/common';

// Define the props interface
interface CheckboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMsg?: string;
    isChecked?: boolean;
}
const Checkbox: React.FC<CheckboxProps> = ({
    label,
    onChange,
    errorMsg,
    isChecked = false,
}) => {
    const id = 'Checkbox-' + getRandomString(10);

    return (
        <div className='form-element checkbox flex flex-1 flex-col'>
            <label className="ml-2 py-1 text-[#a2a2a5]" htmlFor={id}>{label}</label>
            <input
                id={id}
                className='self-start"'
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
            />
        </div>
    );
}

export default Checkbox;