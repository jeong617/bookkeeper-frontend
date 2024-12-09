import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// project
import useSideBarStore from '../../store/store.tsx';
import { FaBars } from 'react-icons/fa6';
import { post } from '../../api/api.ts';

export function Header(): React.JSX.Element {
  const toggle = useSideBarStore((state) => state.toggleIsOpened);
  const navitate = useNavigate();

  // api
  const logout = async () => {
    const url = `auth/logout`;
    try {
      await post({ url: url });
      localStorage.removeItem('accessToken');
      navitate('/auth');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-[45px] px-3.5 py-3.5 bg-[#fffaeb] flex justify-between items-center">
      <div className="flex gap-4">
        <button onClick={toggle}>
          <FaBars size={18} className="fill-button-text" />
        </button>
        <Link to="/" className="h-[45px] justify-start items-center flex">
          <div
            className="h-[60px] text-center text-[#633200] text-[20px] font-normal font-jejudoldam leading-[60px]">BookKeeper
          </div>
          <img alt="fox-logo" className="w-[40px] h-[35px]" src="/src/assets/face-total.png" />
        </Link>
      </div>
      <div
        className="w-[70px] h-[35px] px-px py-[7px] bg-button rounded-[10px] shadow justify-center items-center gap-2.5 flex hover:cursor-pointer hover:bg-button-text"
        onClick={logout}
      >
        <span className="text-center text-white text-[15px] font-semibold leading-[34.50px]">로그아웃</span>
      </div>
    </div>

  );
}
