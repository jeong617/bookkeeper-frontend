import React from 'react';
import { FaPlus } from "react-icons/fa";

interface FormButtonProps {
    label: string;
    icon?: React.JSX.Element | null;
}

function FormButton({ label, icon = <FaPlus className="fill-button-text" /> }: FormButtonProps): React.JSX.Element {
    return (
        <div className="h-[46px] bg-main rounded-normal-radius shadow-md flex-col justify-center items-center inline-flex">
            <div className="self-stretch grow shrink basis-0 px-4 py-4 justify-center items-center gap-3 inline-flex">
                {icon &&icon}
                <div className="text-center text-button-text text-sm font-medium tracking-tight">{label}</div>
            </div>
        </div>
    )
}

export default FormButton;