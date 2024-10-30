import React from "react";

// css
import {IoMdEye, IoIosHeart, IoIosChatboxes, IoIosBookmark} from "react-icons/io";


type DisplayType = "view" | "like" | "comment" | "bookmark";

interface StatsListItemProps {
    rank: number;
    title: string;
    author: string;
    display: DisplayType;
    data: number;
}

function StatsListItem({rank, title, author, display, data}: StatsListItemProps) {
    let icon;
    if (display === "view") {
        icon = <IoMdEye className="fill-line"/>;
    } else if (display === "like") {
        icon = <IoIosHeart/>;
    } else if (display === "comment") {
        icon = <IoIosChatboxes/>;
    } else {
        icon = <IoIosBookmark/>;
    }

    return (
        <div className="grid grid-cols-5 items-center">
            <div className="shrink-0 font-bold">{rank}</div>
            <div className="col-span-3 min-w-0 flex items-center gap-2">
                <p className="truncate font-medium text-gray-900">{title}</p>
                <p className="truncate text-sm self-end text-gray-500">{author}</p>
            </div>
            <div className="inline-flex items-center text-sm gap-0.5">
                {icon}
                <span className="text-line">{data}</span>
            </div>
        </div>
    );
}

export default StatsListItem;
