import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface FormButtonProps {
  label: string;
  icon?: React.JSX.Element | null;
  onClick?: () => void;
}

function FormButton({
                      label,
                      icon = <FaPlus className="fill-button-text" />,
                      onClick,
                    }: FormButtonProps): React.JSX.Element {
  return (
    <button
      className="h-[40px] bg-main rounded-normal-radius shadow-md flex-col justify-center items-center inline-flex"
      onClick={onClick}
    >
      <span className="self-stretch grow shrink basis-0 px-4 py-4 justify-center items-center gap-2 inline-flex">
        {icon && icon}
        <span className="text-center text-button-text text-sm font-medium tracking-tight">{label}</span>
      </span>
    </button>
  );
}

export default FormButton;