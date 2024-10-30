import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface SelectChipProps {
    value: string;
    isActivated: boolean;
}

function SelectChip({value, isActivated=false} : SelectChipProps): React.JSX.Element {
    if (!isActivated) {
        return (
            <div className="h-8 rounded-chips-radius border-[1px] border-line border-opacity-30 flex justify-center items-center inline-flex">
                <div className="px-2 flex justify-center items-center gap-2">
                    <div className="text-center text-line text-xs font-medium">{value}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-8 rounded-chips-radius border-2 border-button flex justify-center items-center inline-flex">
                <div className="pl-3 pr-4 py-1.5 flex justify-center items-center gap-2">
                    <FaCheck className="fill-button" />
                    <div className="text-center text-button text-xs font-medium">{value}</div>
                </div>
            </div>
        )
    }
}

export default SelectChip;