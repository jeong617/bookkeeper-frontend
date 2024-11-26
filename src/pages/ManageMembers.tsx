import React, { useEffect, useState } from 'react';

// project
import { Header } from '../components/header';
import FormButton from '../components/FormButton.tsx';
import SearchBar from '../components/SearchBar';
import { RoleType, SortDirection, SortField } from '../store/types.tsx';
import { get } from '../api/api.ts';

// css
import { FaUser, FaUserCog, FaPlus } from 'react-icons/fa';
import MemberItem from '../components/MemberItem.tsx';
import { AxiosResponse } from 'axios';

function ManageMembers(): React.JSX.Element {
  const [activeTab, setActivetab] = useState<RoleType>(RoleType.Members);
  const [paramOption, setParamOptions] = useState({
    currentPage: 1,
    sortField: SortField.createdAt,
    sortDirection: SortDirection.desc,
  });
  const [memberList, setMemberList] = useState([]);
  const [adminList, setAdminList] = useState([]);

  // member list api
  useEffect(() => {
    const getMemberList = async () => {
      try {
        const res: AxiosResponse = await get({
          url: `admin/members?page=${paramOption.currentPage}&size=10&sortField=${paramOption.sortField}&sortDirectioson=${paramOption.sortDirection}`,
        });
        setMemberList(res.data.memberList);
      } catch (error) {
        console.error('회원 목록을 가져오는 데 실패했습니다.', error);
      }
    };
    getMemberList();
  },)

  // TODO: admin list api


  return (
    <>
      <Header />
      <div className="container px-48 mx-auto mt-12">
        <div className="flex flex-row w-full h-14 justify-between">
          <div className="flex flex-row mt-2">
            <button
              type="button"
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${activeTab === RoleType.Admins ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => setActivetab(RoleType.Admins)}
            >
              <FaUser />
              ADMINS
            </button>
            <button
              type="button"
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${activeTab === RoleType.Members ? 'bg-background underline' : 'bg-white'}`}
              onClick={() => setActivetab(RoleType.Members)}
            >
              <FaUserCog />
              MEMBERS
            </button>
          </div>
          <div className="flex flex-row items-center pr-2 mb-2">
            <div className="scale-75">
              <SearchBar />
            </div>
            <FormButton
              label="ADD"
              icon={<FaPlus className="fill-button-text" />}
            />
          </div>
        </div>

        {/* admin & member list */}
        <div className="bg-background w-full py-3 rounded-tr-normal-radius rounded-b-normal-radius">
          {activeTab === RoleType.Members && (
            <>
              <div className="grid grid-cols-8 gap-2 px-2 items-center mx-2 pb-1">
                <span className="justify-self-center">프로필</span>
                <span className="col-span-2">닉네임</span>
                <span className="col-span-2">이메일</span>
                <span className="col-span-2">가입일</span>
                <span>활성여부</span>
              </div>
              <div className="divide-y">
                <MemberItem
                  email="crystal@gmail.com"
                  createdAt="2024-06-17"
                  nickname="^^"
                  isAccountActive={true}
                  className="rounded-t-normal-radius"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageMembers;
