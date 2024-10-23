import React from "react";
import { FaBars, FaHouse, FaArrowTrendUp, FaUser } from "react-icons/fa6";

interface SideBarProps {
    width: number;
    isOpened?: boolean;
}

export const SideBar = ({ width, isOpened = true }: SideBarProps ): React.JSX.Element | null => {
    if (isOpened) {
        return (
            <div className="flex flex-col w-full h-full p-6 gap-[20px]">
                <div className="h-10 justify-end items-start inline-flex">
                    <FaBars color="black" size="28"/>
                </div>
                <div className="flex flex-row items-center">
                    <FaHouse size="30"/>
                    <div className="h-[52px] w-52 content-center">HOME</div>
                </div>
                <div className="flex flex-row items-center">
                    <FaArrowTrendUp size="30"/>
                    <div className="h-[52px] w-52 content-center">ANALYSIS</div>
                </div>
                <div className="flex flex-row items-center">
                    <FaUser size="30"/>
                    <div className="h-[52px] w-52 content-center">MEMBERS</div>
                </div>
            </div>
        )
    } else return null;
}