import React from 'react';
import { Link } from 'react-router-dom';

// project
import { useSideBarStore } from '../store/store.tsx';

// css
import { Sidebar } from 'flowbite-react';
import { FaHouse, FaUser, FaChartSimple, FaBars } from 'react-icons/fa6';
import { FaBell, FaFileUpload, FaQuestionCircle } from 'react-icons/fa';

export function SideBar(): React.JSX.Element {
  const toggle = useSideBarStore((state) => state.toggleIsOpened);
  const isOpened = useSideBarStore((state) => state.isOpened);

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
          <FaBars size={18} className="fill-button-text mx-auto" />
        </button>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to='/' icon={FaHouse}>
            HOME
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/notification' icon={FaBell}>
            NOTIFICATION
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/members' icon={FaUser}>
            MEMBERS
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/dashboard' icon={FaChartSimple}>
            DASHBOARD
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/upload-monitor' icon={FaFileUpload}>
            UPLOAD MONITOR
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/feedback' icon={FaQuestionCircle}>
            문의하기
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
