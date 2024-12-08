import React from 'react';

// css
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

interface MemberItemProps {
  profile?: string;
  email: string;
  createdAt: string;
  nickname: string;
  isAccountActive?: string | null;
  className?: string;

}

function MemberItem({ profile = '/default-profile.svg',
                      email,
                      nickname,
                      createdAt,
                      isAccountActive = null,
                      className,
                    }: MemberItemProps): React.JSX.Element {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/default-profile.svg';
  };

  return (
    <div className={`grid grid-cols-8 gap-2 px-2 items-center bg-white mx-2 ${className}`}>
      <img src={profile} className='aspect-square h-[4.5rem] p-2 mx-auto'
           onError={handleImageError}
           alt='profile-image'
      />
      <span className='col-span-2'>{nickname}</span>
      <span className='col-span-2'>{email}</span>
      <span className='col-span-2 flex gap-2 items-baseline'>
              <p>{createdAt.split(' ')[0]}</p>
              <p className='text-sm font-light bottom-0'>{createdAt.split(' ')[1]}</p>
            </span>
      <button className='grow'>
        {!isAccountActive ?
          <IoEyeOutline size={20} className='mx-auto' /> : <IoEyeOffOutline size={20} className='mx-auto' />}
      </button>
    </div>

  );
}

export default MemberItem;