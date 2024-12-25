import React from "react";


interface InputBoxProps {
    className?: string;
    label?: string;
    value?: string;
    rows?: number;
    errorMessage?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function InputBox({className, label, value, rows=1, errorMessage, name, onChange}: InputBoxProps): React.JSX.Element{
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <label htmlFor="label"
                   className="block ml-1 mb-1 text-xs font-medium text-line">{label}</label>
            <textarea
                   className={`border border-line border-opacity-20 text-sm rounded-lg block w-full px-0.5 py-1.5 focus:ring-blue-100`}
                   rows={rows}
                   value={value}
                   name={name}
                   onChange={onChange}
            />
            {errorMessage && (
                <span className="text-xs text-red-500">{errorMessage}</span>
            )}
        </div>
    )
}

export default InputBox;