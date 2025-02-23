import React, {useEffect, useRef, useState} from 'react';

interface PendingAdminItemProps {
  profile?: string;
  memberId: string;
  email: string;
  createdAt: string;
  nickname: string;
  className?: string;
  onClick: (memberId: string, role: string) => void;
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
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감싸는 ref 생성

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/default-profile.svg';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);


  return (
    <div className={`relative grid grid-cols-8 gap-2 px-2 py-1 items-center bg-white mx-2 ${className}`}>
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
      <div className='relative flex justify-center items-center bg-gray-100 rounded-normal-radius hover:bg-button md:mx-3'>
        {!openDropdown && (
          <button
            className='text-gray-800 py-2 hover:text-white'
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            승인
          </button>
        )}
        <div className={`absolute z-10 -top-5 left-0 bg-white border
                        ${openDropdown ? '' : 'hidden'}`}
             ref={dropdownRef}
        >
          <ul className="w-max flex flex-col p-1.5 justify-center items-center text-xs text-gray-700">
            <li className="px-1 py-2 border-b whitespace-nowrap hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onClick(memberId, 'AUTHOR');
                  setOpenDropdown(false);
                }}
            >
              작가
            </li>
            <li className="px-1 py-2 whitespace-nowrap hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onClick(memberId, 'ADMIN');
                  setOpenDropdown(false);
                }}
            >
              관리자
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
}

export default PendingAdminItem;