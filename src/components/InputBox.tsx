import React from "react";


interface InputBoxProps {
    className?: string;
    label?: string;
    defaultValue?: string;
    rows?: number;
    errorMessage?: string;
}

function InputBox({className, label, defaultValue, rows=1, errorMessage}: InputBoxProps): React.JSX.Element{
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <label htmlFor="label"
                   className="block ml-1 mb-1 text-xs font-medium text-line">{label}</label>
            <textarea
                   className={`border border-line border-opacity-20 text-sm rounded-lg block w-full px-0.5 py-1.5 focus:ring-blue-100`}
                   rows={rows}
                   defaultValue={defaultValue}
            />
            {errorMessage && (
                <span className="text-xs text-red-500">{errorMessage}</span>
            )}
        </div>
    )
}

export default InputBox;