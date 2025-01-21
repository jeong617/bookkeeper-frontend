import React from 'react';

interface SimpleBookCardProps {
  title: string;
  author: string;
  coverImageUrl?: string;
}

function SimpleBookCard({ title, author, coverImageUrl }: SimpleBookCardProps): React.JSX.Element {
  let defaultImage = '/book-cover/default-book-cover.jpg';
  if (title === '동백꽃1') {
    defaultImage = '/book-cover/flower.jpeg';
  }
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = defaultImage;
  };
  return (
    <div className='flex flex-col w-32 items-start md:w-40'>
      {/* 커버 이미지 */}
      <img alt="cover-image" className='h-48 mb-2 shadow-lg rounded-normal-radius md:h-60'
           src={coverImageUrl}
           onError={handleImageError}
      />
      {/* 제목 & 작가 */}
      <div className='w-full text-xl font-bold ml-1 truncate'>{title}</div>
      <div className='w-full ml-1 truncate'>{author}</div>
    </div>
  );
}

export default SimpleBookCard;
