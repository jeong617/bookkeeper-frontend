import React, { useEffect, useState } from 'react';

// project
import { Header } from '../components/header';
import FormButton from '../components/FormButton.tsx';
import SearchBar from '../components/SearchBar';
import { RoleType, SortFieldType, SortDirectionType } from '../store/types.tsx';
import { MemberData } from '../store/UserData.ts';
import formatDateTime from '../utils/parseDateTime.ts';
import { get } from '../api/api.ts';

// css
import { FaUser, FaUserCog, FaPlus } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa6';
import MemberItem from '../components/MemberItem.tsx';
import { AxiosResponse } from 'axios';

function ManageMembers(): React.JSX.Element {
  const [paramOption, setParamOptions] = useState({
    currentPage: 1,
    sortField: SortFieldType.CreatedAt,
    sortDirection: SortDirectionType.Desc,
    role: RoleType.Member,
  });
  const [memberList, setMemberList] = useState<MemberData[]>([]);

  useEffect(() => {
    const getMemeberList = async () => {
      try {
        const res: AxiosResponse = await get({
          url: `api/admin/members?page=${paramOption.currentPage}&size=10&sortField=${paramOption.sortField}&sortDirectioson=${paramOption.sortDirection}&role=${paramOption.role}`,
        });
        setMemberList(res.data.memberList);
      } catch (error) {
        console.error('회원 목록을 가져오는 데 실패했습니다.', error);
      }
    };
    getMemeberList();
  }, [paramOption.role]);

  return (
    <>
      <Header />
      <div className='container px-48 mx-auto mt-12'>
        <div className='flex flex-row w-full h-14 justify-between'>
          <div className='flex flex-row mt-2'>
            <button
              type='button'
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${paramOption.role === RoleType.Admin ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => setParamOptions((prev) => ({ ...prev, role: RoleType.Admin }))}
            >
              <FaUser />
              ADMINS
            </button>
            <button
              type='button'
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${paramOption.role === RoleType.Member ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => setParamOptions((prev) => ({ ...prev, role: RoleType.Member }))}
            >
              <FaUserCog size={20} />
              MEMBERS
            </button>
            <button
              type='button'
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${paramOption.role === RoleType.PendingAdmin ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => setParamOptions((prev) => ({ ...prev, role: RoleType.PendingAdmin }))}
            >
              <FaUserCheck size={20} />
              승인 대기
            </button>
          </div>
          <div className='flex flex-row items-center pr-2 mb-2'>
            <div className='scale-75'>
              <SearchBar />
            </div>
            <FormButton
              label='ADD'
              icon={<FaPlus className='fill-button-text' />}
            />
          </div>
        </div>

        {/* admin & pending admin & member list */}
        <div className='bg-background w-full py-3 rounded-tr-normal-radius rounded-b-normal-radius'>
          <>
            <div className='grid grid-cols-8 gap-2 px-2 items-center mx-2 pb-1'>
              <span className='justify-self-center'>프로필</span>
              <span className='col-span-2'>닉네임</span>
              <span className='col-span-2'>이메일</span>
              <span className='col-span-2'>가입일</span>
              <span className='mx-auto'>활성여부</span>
            </div>
            <div className='divide-y'>
              {memberList.map(member => (
                <MemberItem
                  key={member.id}
                  email={member.email}
                  createdAt={formatDateTime(member.createdAt)}
                  nickname={member.nickname}
                  profile={member.profileImageUrl ?? undefined}
                  isAccountActive={member.deletedAt}
                />
              ))}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default ManageMembers;
