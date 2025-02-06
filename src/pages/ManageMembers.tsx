import React, {useEffect, useState} from 'react';
import {AxiosResponse} from 'axios';

// project
import {Header} from '../components/header';
import FormButton from '../components/FormButton.tsx';
import SearchBar from '../components/SearchBar';
import {RoleType, SortDirectionType, SortFieldType} from '../store/types.tsx';
import {MemberData} from '../store/userData.ts';
import {formatDateTime} from '../utils/parseDateTime.ts';
import {get, put} from '../api/api.ts';
import useInfiniteScroll from '../hooks/useInfiniteScroll.ts';
import MemberItem from '../components/MemberItem.tsx';
import PendingAdminItem from '../components/PendingAdminItem.tsx';

// css
import {FaPlus, FaUser, FaUserCog} from 'react-icons/fa';
import {FaUserCheck} from 'react-icons/fa6';

function ManageMembers(): React.JSX.Element {
  const [paramOption, setParamOptions] = useState({
    currentPage: 1,
    sortField: SortFieldType.CreatedAt,
    sortDirection: SortDirectionType.Desc,
    role: RoleType.Member,
  });
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(10000000);

  // handler
  const clickTap = (role: RoleType) => {
    setMemberList([]);
    setParamOptions((prev) => ({...prev, role: role, currentPage: 1}))
    setTotalPages(10000000);
  }

  // api
  // TODO: 무한스크롤 에러 해결 & memeberList 비워주는 로직 추가
  const fetchMoreMembers = async () => {
    if (totalPages === 0 || totalPages < paramOption.currentPage) return;
    try {
      const res: AxiosResponse = await get({
        url: `api/admin/members?page=${paramOption.currentPage}&size=5&sortField=${paramOption.sortField}&sortDirection=${paramOption.sortDirection}&role=${paramOption.role}`,
      });
      setTotalPages(res.data.totalPages);
      setMemberList((prev) => [...prev, ...res.data.memberList]);
      setParamOptions((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
      setIsFetching(false);
    } catch (error) {
      console.error('회원 목록을 가져오는 데 실패했습니다.', error);
      setIsFetching(false);
    }
  };
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreMembers);

  useEffect(() => {
    fetchMoreMembers();
  }, [paramOption]);

  const approveAdmin = async (pendingAdminId: string) => {
    const url = `api/admin/members/${pendingAdminId}/roles/ADMIN`;
    try {
      const res: AxiosResponse = await put({url: url});
      setParamOptions((prev) => ({...prev, role: RoleType.Admin}));
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <Header/>
      {/* Desktop */}
      <div className='w-full container mx-auto mt-1 md:my-12 md:flex md:flex-col md:px-48'>
        <div className='flex w-full h-14 md:justify-between'>
          <div className='flex w-full mt-2'>
            <button
              type='button'
              className={`w-1/3 font-bold rounded-t-normal-radius flex justify-center items-center gap-1 md:w-32
                                ${paramOption.role === RoleType.Admin ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => clickTap(RoleType.Admin)}
            >
              <FaUser/>
              ADMINS
            </button>
            <button
              type='button'
              className={`w-1/3 font-bold rounded-t-normal-radius flex justify-center items-center gap-1 md:w-32
                                ${paramOption.role === RoleType.Member ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => clickTap(RoleType.Member)}
            >
              <FaUserCog size={20}/>
              MEMBERS
            </button>
            <button
              type='button'
              className={`w-1/3 md:w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${paramOption.role === RoleType.PendingAdmin ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => clickTap(RoleType.PendingAdmin)}
            >
              <FaUserCheck size={20}/>
              승인 대기
            </button>
          </div>
          <div className='hidden md:flex flex-row items-center pr-2 mb-2'>
            <div className='scale-75'>
              <SearchBar defaultQuery=''/>
            </div>
            <FormButton
              label='ADD'
              icon={<FaPlus className='fill-button-text'/>}
            />
          </div>
        </div>

        {/* admin & pending admin & member list */}
        <div className='bg-background w-full py-3 rounded-tr-normal-radius rounded-b-normal-radius'>
          <>
            <div className='grid grid-cols-8 gap-2 px-2 items-center mx-2 pb-1 text-sm'>
              <span className='justify-self-center'>프로필</span>
              {/* Desktop */}
              <span className='hidden md:col-span-2'>닉네임</span>
              <span className='hidden md:col-span-2'>이메일</span>

              {/* Mobile */}
              <span className='col-span-4'>닉네임/이메일</span>

              <span className='col-span-2'>가입일</span>
              {paramOption.role !== RoleType.PendingAdmin && <span className='mx-auto'>활성</span>}
            </div>
            <div className='divide-y'>
              {memberList.map(member => (
                paramOption.role !== RoleType.PendingAdmin ? (
                  <MemberItem
                    key={member.id}
                    email={member.email}
                    createdAt={formatDateTime(member.createdAt)}
                    nickname={member.nickname}
                    profile={member.profileImageUrl ?? undefined}
                    deletedAt={member.deletedAt}
                  />
                ) : (
                  <PendingAdminItem
                    key={member.id}
                    memberId={member.id}
                    email={member.email}
                    createdAt={formatDateTime(member.createdAt)}
                    nickname={member.nickname}
                    profile={member.profileImageUrl ?? undefined}
                    onClick={approveAdmin}
                  />
                )
              ))}
              {isFetching && (
                <p>loading...</p>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default ManageMembers;
