import React from 'react';

// css
import { FaTrashAlt } from "react-icons/fa";
import { Badge } from "flowbite-react";

interface CommentItemProps {
    chapter: number;
    nickname: string;
    comment: string;
    created_at: string;
}

function CommentItem({chapter, nickname, comment, created_at}:CommentItemProps): React.JSX.Element {

    return (
        <div className="flex flex-col items-start bg-white mx-1 px-3 py-3 rounded-normal-radius">
            {/* label */}
            <div className="w-full flex flex-row justify-between justify-center items-center gap-2">
                <div className="flex flex-row">
                    <Badge className="rounded-chips-radius" size="xs" color="gray">{chapter}화</Badge>
                    <div>
                        <span>{nickname}</span>
                        <span>{created_at}</span>
                    </div>
                </div>
                <FaTrashAlt className="fill-red-500" />
            </div>

            {/* comment */}
            <span>{comment}</span>
        </div>
    )
}

export default CommentItem;