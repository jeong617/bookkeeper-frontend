import React from 'react';

// css
import { FaTrashAlt, FaPen } from "react-icons/fa";

interface EpisodeListItemProps {
    chapterNum: number;
    episodeTitle: string;
}

function EpisodeListItem({chapterNum, episodeTitle}: EpisodeListItemProps): React.JSX.Element {

    return (
        <div className="flex flex-row bg-white mx-1 px-3 py-3 justify-between rounded-md">
            {/* 제목 */}
            <div className="flex flex-row gap-2">
                <span className="font-bold text-xl">{`chpater${chapterNum}`}</span>
                <span className="text-lg py-0.5">{episodeTitle}</span>
            </div>

            {/* form button */}
            <div className="flex flex-row gap-5 items-center">
                <FaPen />
                <FaTrashAlt className="fill-red-500" />
            </div>
        </div>
    )
}

export default EpisodeListItem;