import { Outlet } from 'react-router-dom';

// project
import { SideBar } from '../components/SideBar.tsx';
import useSideBarStore from '../store/store.tsx';

const MainLayout = (): React.JSX.Element => {
  const isOpened = useSideBarStore((state) => state.isOpened);
  const toggle = useSideBarStore((state) => state.toggleIsOpened);

  // handler
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened) {
      // 클릭한 요소가 사이드바가 아닐 경우에만 toggle 실행
      const sidebarElement = document.querySelector('aside');
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        toggle();
      }
    }
  };

  return (
    <div className="h-full flex relative" onClick={handleOutsideClick}>
      {/* SideBar */}
      <aside
        className={`fixed h-full z-10 transform transition-transform duration-300 ${
          isOpened ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideBar />
      </aside>

      {/* contents */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;