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
            <img className="w-52 mb-2 shadow-lg" src={coverImageUrl}/>
            {/* 제목 & 작가 */}
            <div className="text-3xl font-medium">{title}</div>
            <div>{author}</div>
        </div>
    )
}

export default SimpleBookCard;
