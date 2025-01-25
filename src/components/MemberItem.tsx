import React from 'react';

// css
import {IoEyeOutline, IoEyeOffOutline} from 'react-icons/io5';

interface MemberItemProps {
  profile?: string;
  email: string;
  createdAt: string;
  nickname: string;
  deletedAt?: string | null;
  className?: string;

}

function MemberItem({
                      profile = '/default-profile.svg',
                      email,
                      nickname,
                      createdAt,
                      deletedAt = null,
                      className,
                    }: MemberItemProps): React.JSX.Element {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/default-profile.svg';
  };
  return (
    <div className={`grid grid-cols-8 gap-2 px-2 py-1 items-center bg-white mx-2 ${className}`}>
      <img src={profile} className='aspect-square p-2 mx-auto rounded-full md:h-[4.5rem]'
           onError={handleImageError}
           alt='profile-image'
      />
      {/* Desktop */}
      <span className='hidden overflow-hidden md:col-span-2'>{nickname}</span>
      <span className='hidden overflow-hidden md:col-span-2'>{email}</span>

      {/* Mobile */}
      <div className='col-span-4 overflow-hidden'>
        <p className='font-semibold'>{nickname}</p>
        <p className='text-sm'>{email}</p>
      </div>
      <span className='col-span-2 flex flex-col items-baseline overflow-hidden md:text-nowrap md:gap-2'>
        <p>{createdAt.split(' ')[0]}</p>
        <p className='text-sm font-light bottom-0'>{createdAt.split(' ')[1]}</p>
      </span>
      <button className='grow'>
        {!deletedAt ?
          <IoEyeOutline size={20} className='mx-auto'/> : <IoEyeOffOutline size={20} className='mx-auto'/>}
      </button>
    </div>

  );
}

export default MemberItem;