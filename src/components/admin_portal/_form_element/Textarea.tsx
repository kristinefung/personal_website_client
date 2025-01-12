import React from 'react';
import { getRandomString } from 'src/utils/common';

import './_form_element.css';

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
                <label htmlFor={id}>{label}</label>
                <div className='error-msg'>{errorMsg}</div>
            </div>
            <textarea
                id={id}
                className={errorMsg ? 'error-field' : ''}
                value={value}
                onChange={onChange}
                disabled={isDisabled}
            />
        </div>
    );
}

export default Textarea;