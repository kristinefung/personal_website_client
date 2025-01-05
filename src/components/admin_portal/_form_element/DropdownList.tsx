import React from 'react';
import { getRandomString } from 'src/utils/common';

import './_form_element.css';

// Define the props interface
interface DropdownListProps {
    label: string;
    value: string;
    options: {
        label: string;
        value: number;
    }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    errorMsg?: string;
    isDisabled?: boolean;
}
const DropdownList: React.FC<DropdownListProps> = ({
    label,
    value,
    options,
    onChange,
    errorMsg,
    isDisabled = false,
}) => {
    const id = 'dropdownlist-' + getRandomString(10);

    return (
        <div className='form-element dropdown-list'>
            <div className='row'>
                <label htmlFor={id}>{label}</label>
                <div className='error-msg'>{errorMsg}</div>
            </div>
            <select
                id={id}
                className={errorMsg ? 'error-field' : ''}
                value={value}
                onChange={onChange}
                disabled={isDisabled}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropdownList;