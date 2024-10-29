import React from 'react';

// css
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface MemberItemProps {
    profile?: string;
    email: string;
    createdAt: string;
    nickname: string;
    isAccountActive: boolean;
    className?: string;

}

function MemberItem({profile="/src/assets/3d_avatar_28.png" ,email, nickname, createdAt, className}: MemberItemProps): React.JSX.Element {
    /* 상태 관리 */

    return (
        <div className={`flex flex-row gap-2 px-2 items-center bg-white mx-2 ${className}`}>
            <img src={profile} className="aspect-square w-16 p-2" />
            <span className="w-36">{nickname}</span>
            <span className="w-44">{email}</span>
            <span className="w-36">{createdAt}</span>
            <span className="">
                <IoEyeOutline />
            </span>
        </div>

    )
}

export default MemberItem;