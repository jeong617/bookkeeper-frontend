import React from 'react';
import { Link } from 'react-router-dom';

// project
import useSideBarStore from '../store/store.tsx';

// css
import { Sidebar } from 'flowbite-react';
import { FaHouse, FaUser, FaChartSimple, FaBars } from 'react-icons/fa6';

// sidebar custom

export function SideBar(): React.JSX.Element {
  const toggle = useSideBarStore((state) => state.toggleIsOpened);

  // Sidebar Custom
  const customTheme = {
    root: {
      base: 'bg-white h-full', // Sidebar 전체 배경색과 텍스트 색상
      inner: 'p-4', // Sidebar 내부 패딩
    },


  };

  return (
    <Sidebar className='ease-in-out duration-500 shadow-2xl drop-shadow-2xl' theme={customTheme}>
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
          <Sidebar.Item as={Link} to='/members' icon={FaUser}>
            MEMBERS</Sidebar.Item>
          <Sidebar.Item as={Link} to='/dashboard' icon={FaChartSimple}>
            DASHBOARD</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
