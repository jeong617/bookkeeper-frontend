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
      <img src={profile} className='aspect-square h-[4.5rem] p-2 mx-auto rounded-full'
           onError={handleImageError}
           alt='profile-image'
      />
      <span className='col-span-2'>{nickname}</span>
      <span className='col-span-2'>{email}</span>
      <span className='col-span-2 flex gap-2 items-baseline'>
              <p>{createdAt.split(' ')[0]}</p>
              <p className='text-sm font-light bottom-0'>{createdAt.split(' ')[1]}</p>
            </span>
      <button
        className='grow text-gray-800 bg-gray-100 mx-3 py-2 rounded-normal-radius hover:bg-button hover:text-white'
        onClick={() => onClick(memberId)}
      >
        승인하기
      </button>
    </div>

  );
}

export default PendingAdminItem;