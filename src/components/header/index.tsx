import React from "react";
import { Link } from 'react-router-dom';

export function Header(): React.JSX.Element {
    return (
        <div className="w-full h-[45px] px-3.5 py-3.5 bg-[#fffaeb] flex justify-between items-center">
            <Link to='/' className="h-[45px] justify-start items-center flex">
                <div
                    className="h-[60px] text-center text-[#633200] text-[20px] font-normal font-jejudoldam leading-[60px]">BookKeeper
                </div>
                <img className="w-[40px] h-[35px]" src="/src/assets/face-total.png"/>
            </Link>
            <div
                className="w-[70px] h-[35px] px-px py-[7px] bg-[#dbb185] rounded-[10px] shadow justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-[15px] font-semibold leading-[34.50px]">로그아웃</div>
            </div>
        </div>

    );
}
