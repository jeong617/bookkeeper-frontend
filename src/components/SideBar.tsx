import React from 'react';
import {Link} from 'react-router-dom';

// project
import {useRoleStore, useSideBarStore} from '../store/store.tsx';

// css
import {Sidebar} from 'flowbite-react';
import {FaHouse, FaUser, FaChartSimple, FaBars} from 'react-icons/fa6';
import {FaBell, FaFileUpload, FaQuestionCircle, FaHandHoldingMedical} from 'react-icons/fa';
import {RoleType} from '../store/types.tsx';

export function SideBar(): React.JSX.Element {
  const toggle = useSideBarStore((state) => state.toggleIsOpened);
  const isOpened = useSideBarStore((state) => state.isOpened);
  const role = useRoleStore((state) => state.role);

  // Sidebar Custom
  const customTheme = {
    root: {
      base: 'bg-white h-full',
      inner: 'p-4',
    },
  };

  return (
    <Sidebar className={`ease-in-out duration-500 ${isOpened ? `shadow-2xl drop-shadow-2xl` : ''}`} theme={customTheme}>
      <div className="">
        <button
          onClick={toggle}
          className='relative flex items-center'
        >
          <FaBars size={18} className="fill-button-text mx-auto"/>
        </button>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to='/' icon={FaHouse} onClick={toggle}>
            HOME
          </Sidebar.Item>
          {role === RoleType.Admin && (
            <Sidebar.Item as={Link} to='/notification' icon={FaBell} onClick={toggle}>
              NOTIFICATION
            </Sidebar.Item>
          )}
          {role === RoleType.Admin && (
            <Sidebar.Item as={Link} to='/members' icon={FaUser} onClick={toggle}>
              MEMBERS
            </Sidebar.Item>
          )}
          <Sidebar.Item as={Link} to='/dashboard' icon={FaChartSimple} onClick={toggle}>
            DASHBOARD
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/upload-monitor' icon={FaFileUpload} onClick={toggle}>
            UPLOAD MONITOR
          </Sidebar.Item>
          {role === RoleType.Admin && (
            <Sidebar.Item as={Link} to='/novel-request' icon={FaHandHoldingMedical} onClick={toggle}>
              소설요청
            </Sidebar.Item>
          )}
          <Sidebar.Item as={Link} to='/feedback' icon={FaQuestionCircle} onClick={toggle}>
            문의하기
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
