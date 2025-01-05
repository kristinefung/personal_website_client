import React from 'react';
import { getRandomString } from 'src/utils/common';

import './_form_element.css';

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
        <div className='form-element checkbox'>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
            />
        </div>
    );
}

export default Checkbox;