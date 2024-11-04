import React from 'react';
import { FaPlus } from "react-icons/fa";

interface FormButtonProps {
    label: string;
    icon?: React.JSX.Element | null;
}

function FormButton({ label, icon = <FaPlus className="fill-button-text" /> }: FormButtonProps): React.JSX.Element {
    return (
        <button className="h-[40px] bg-main rounded-normal-radius shadow-md flex-col justify-center items-center inline-flex">
            <div className="self-stretch grow shrink basis-0 px-4 py-4 justify-center items-center gap-2 inline-flex">
                {icon &&icon}
                <div  className="text-center text-button-text text-sm font-medium tracking-tight">{label}</div>
            </div>
        </button>
    )
}

export default FormButton;