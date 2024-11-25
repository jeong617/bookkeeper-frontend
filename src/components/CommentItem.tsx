import React from 'react';

// css
import { FaTrashAlt } from "react-icons/fa";
import { Badge } from "flowbite-react";

interface CommentItemProps {
    episodeNumber: number;
    userName: string;
    content: string;
    createdAt: string;
}

function CommentItem({episodeNumber, userName, content, createdAt}:CommentItemProps): React.JSX.Element {

    return (
        <div className="flex flex-col items-start bg-white mx-1 px-3 py-2 gap-1 rounded-normal-radius">
            {/* label */}
            <div className="w-full flex flex-row justify-between justify-center items-center gap-2">
                <div className="flex flex-row gap-2">
                    <Badge className="mb-1 rounded-chips-radius border border-button text-button" size="xs">{episodeNumber}화</Badge>
                    <div>
                        <span className="mr-1">{userName}</span>
                        <span className="text-xs">{createdAt}</span>
                    </div>
                </div>
                <FaTrashAlt className="fill-red-500" />
            </div>

            {/* comment */}
            <span className="px-1.5">{content}</span>
        </div>
    )
}

export default CommentItem;