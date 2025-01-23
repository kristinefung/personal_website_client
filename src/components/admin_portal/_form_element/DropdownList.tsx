import React from 'react';
import { getRandomString } from 'src/utils/common';

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
        <div className='form-element dropdown-list flex flex-1 flex-col'>
            <div className='row'>
                <label className='py-1 text-[#a2a2a5]' htmlFor={id}>{label}</label>
                <div className='error-msg'>{errorMsg}</div>
            </div>
            <select
                id={id}
                className='p-2.5 text-white border border-[#4a4a54] rounded-lg bg-[#37373f] cursor-pointer w-full transition-colors duration-300 ease-in-out'
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