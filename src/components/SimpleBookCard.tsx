import React from "react";

interface SimpleBookCardProps {
    title: string;
    author: string;
    category: string;
    coverImageUrl: string;
}

function SimpleBookCard({ title, author, category, coverImageUrl }: SimpleBookCardProps) : React.JSX.Element {
    return (
        <div className="flex flex-col items-start">
            {/* 커버 이미지 */}
            <img className="w-40 mb-2 shadow-lg rounded-normal-radius" src={coverImageUrl}/>
            {/* 제목 & 작가 */}
            <div className="text-xl font-bold ml-1">{title}</div>
            <div className="ml-1">{author}</div>
        </div>
    )
}

export default SimpleBookCard;
