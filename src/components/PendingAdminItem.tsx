import React from 'react';

interface PendingAdminItemProps {
  profile?: string;
  memberId: string;
  email: string;
  createdAt: string;
  nickname: string;
  className?: string;
  onClick: (memberId: string) => void;
}

function PendingAdminItem({
                            profile = '/default-profile.svg',
                            memberId,
                            email,
                            nickname,
                            createdAt,
                            className,
                            onClick,
                          }: PendingAdminItemProps): React.JSX.Element {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/default-profile.svg';
  };
  return (
    <div className={`grid grid-cols-8 gap-2 px-2 items-center bg-white mx-2 ${className}`}>
      <img src={profile} className='aspect-square p-2 mx-auto rounded-full md:h-[4.5rem]'
           onError={handleImageError}
           alt='profile-image'
      />

      {/* Desktop */}
      <span className='hidden md:col-span-2'>{nickname}</span>
      <span className='hidden md:col-span-2'>{email}</span>

      {/* Mobile */}
      <div className='col-span-4 overflow-hidden'>
        <p className='font-semibold'>{nickname}</p>
        <p className='text-sm'>{email}</p>
      </div>

      <span className='col-span-2 flex flex-col items-baseline overflow-hidden md:text-nowrap'>
        <p>{createdAt.split(' ')[0]}</p>
        <p className='text-sm font-light bottom-0'>{createdAt.split(' ')[1]}</p>
      </span>
      <button
        className='grow text-gray-800 bg-gray-100 py-2 rounded-normal-radius hover:bg-button hover:text-white md:mx-3'
        onClick={() => onClick(memberId)}
      >
        승인
      </button>
    </div>

  );
}

export default PendingAdminItem;