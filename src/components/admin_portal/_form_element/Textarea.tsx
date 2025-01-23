import React from 'react';
import { getRandomString } from 'src/utils/common';

// Define the props interface
interface TextareaProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    errorMsg?: string;
    isDisabled?: boolean;
}
const Textarea: React.FC<TextareaProps> = ({
    label,
    value,
    onChange,
    errorMsg,
    isDisabled = false,
}) => {
    const id = 'textarea-' + getRandomString(10);

    return (
        <div className='form-element textarea flex flex-1 flex-col'>
            <div className='row'>
                <label className='py-1 text-[#a2a2a5]' htmlFor={id}>{label}</label>
                <div className='error-msg'>{errorMsg}</div>
            </div>
            <textarea
                id={id}
                className='border border-[#4a4a54] bg-[#37373f] rounded-lg p-2.5 text-white h-[100px] min-h-[100px] resize-y'
                value={value}
                onChange={onChange}
                disabled={isDisabled}
            />
        </div>
    );
}

export default Textarea;