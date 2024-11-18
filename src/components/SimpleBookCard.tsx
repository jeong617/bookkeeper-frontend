import React from 'react';

interface SimpleBookCardProps {
  title: string;
  author: string;
  coverImageUrl?: string;
}

function SimpleBookCard({ title, author, coverImageUrl }: SimpleBookCardProps): React.JSX.Element {
  const defaultImage = '/book-cover/default-book-cover.jpg';
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = defaultImage;
  };
  return (
    <div className="flex flex-col items-start">
      {/* 커버 이미지 */}
      <img alt="cover-image" className="w-40 h-60 mb-2 shadow-lg rounded-normal-radius" src={coverImageUrl}
           onError={handleImageError}
      />
      {/* 제목 & 작가 */}
      <div className="w-40 text-xl font-bold ml-1 truncate ...">{title}</div>
      <div className="w-40 ml-1 text-ellipsis truncate ...">{author}</div>
    </div>
  );
}

export default SimpleBookCard;
