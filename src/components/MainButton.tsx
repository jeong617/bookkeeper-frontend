import React from "react";

interface MainButtonProps {
    className?: string;
    label: string;
}

function MainButton({label, className}: MainButtonProps): React.JSX.Element {
    return (
        <div className={`px-3 py-1.5 bg-button rounded-[10px] shadow justify-center items-center gap-2.5 inline-flex ${className}`}>
            <div className="text-center text-white font-bold">{label}</div>
        </div>
    )
}

export default MainButton;