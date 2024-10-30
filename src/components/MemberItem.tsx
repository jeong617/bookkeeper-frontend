import React from 'react';

// css
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface MemberItemProps {
    profile?: string;
    email: string;
    createdAt: string;
    nickname: string;
    isAccountActive?: boolean;
    className?: string;

}

function MemberItem({profile="/src/assets/3d_avatar_28.png" ,email, nickname, createdAt, isAccountActive=true, className}: MemberItemProps): React.JSX.Element {
    /* 상태 관리 */

    return (
        <div className={`grid grid-cols-8 gap-2 px-2 items-center bg-white mx-2 ${className}`}>
            <img src={profile} className="aspect-square h-[4.5rem] p-2 mx-auto" />
            <span className="col-span-2">{nickname}</span>
            <span className="col-span-2">{email}</span>
            <span className="col-span-2">{createdAt}</span>
            <button className="grow">
                {isAccountActive ? <IoEyeOutline size={20} className="mx-auto"/> : <IoEyeOffOutline size={20} className="mx-auto"/>}
            </button>
        </div>

    )
}

export default MemberItem;